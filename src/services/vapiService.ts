declare global {
  interface Window {
    vapiSDK: {
      run: (config: {
        apiKey: string;
        assistant: string;
        config?: any;
      }) => any;
    };
  }
}

class VapiService {
  private vapiInstance: any = null;
  private isScriptLoaded = false;
  private scriptLoadPromise: Promise<void> | null = null;

  constructor() {
    this.loadVapiScript();
  }

  private loadVapiScript(): Promise<void> {
    if (this.scriptLoadPromise) {
      return this.scriptLoadPromise;
    }

    this.scriptLoadPromise = new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.vapiSDK) {
        this.isScriptLoaded = true;
        resolve();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
      script.defer = true;
      script.async = true;

      script.onload = () => {
        this.isScriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load VAPI SDK'));
      };

      // Insert script into document
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    });

    return this.scriptLoadPromise;
  }

  async initializeVapi(): Promise<boolean> {
    try {
      await this.loadVapiScript();

      const apiKey = import.meta.env.VITE_VAPI_API_KEY;
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

      if (!apiKey || !assistantId) {
        console.warn('VAPI API key or Assistant ID not found in environment variables');
        return false;
      }

      if (!window.vapiSDK) {
        console.error('VAPI SDK not loaded');
        return false;
      }

      // Initialize VAPI instance using the provided script format
      const buttonConfig = {}; // Modify this as required
      
      this.vapiInstance = window.vapiSDK.run({
        apiKey: apiKey, // mandatory
        assistant: { id: assistantId }, // mandatory
        config: buttonConfig, // optional
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize VAPI:', error);
      return false;
    }
  }

  async startCall(): Promise<boolean> {
    try {
      if (!this.vapiInstance) {
        const initialized = await this.initializeVapi();
        if (!initialized) {
          return false;
        }
      }

      // Start the call using VAPI instance
      if (this.vapiInstance && typeof this.vapiInstance.start === 'function') {
        await this.vapiInstance.start();
        return true;
      } else {
        console.error('VAPI instance not properly initialized or start method not available');
        return false;
      }
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      return false;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (this.vapiInstance && typeof this.vapiInstance.stop === 'function') {
        await this.vapiInstance.stop();
      }
    } catch (error) {
      console.error('Failed to end VAPI call:', error);
    }
  }

  isConfigured(): boolean {
    const apiKey = import.meta.env.VITE_VAPI_API_KEY;
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    return !!(apiKey && assistantId);
  }

  getVapiInstance() {
    return this.vapiInstance;
  }
}

export const vapiService = new VapiService();