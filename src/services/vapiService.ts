declare global {
  interface Window {
    VapiWidget: any;
  }
}

class VapiService {
  private widget: any = null;
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
      if (window.VapiWidget) {
        this.isScriptLoaded = true;
        resolve();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js';
      script.async = true;
      script.type = 'text/javascript';

      script.onload = () => {
        this.isScriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load VAPI SDK'));
      };

      document.head.appendChild(script);
    });

    return this.scriptLoadPromise;
  }

  async initializeVapi(): Promise<boolean> {
    try {
      await this.loadVapiScript();

      const publicKey = import.meta.env.VITE_VAPI_API_KEY;
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

      if (!publicKey || !assistantId) {
        console.warn('VAPI public key or Assistant ID not found in environment variables');
        return false;
      }

      if (!window.VapiWidget) {
        console.error('VAPI Widget not loaded');
        return false;
      }

      // Create widget element
      const widgetElement = document.createElement('vapi-widget');
      widgetElement.setAttribute('assistant-id', assistantId);
      widgetElement.setAttribute('public-key', publicKey);
      
      // Hide the widget initially
      widgetElement.style.display = 'none';
      document.body.appendChild(widgetElement);

      this.widget = widgetElement;
      return true;
    } catch (error) {
      console.error('Failed to initialize VAPI:', error);
      return false;
    }
  }

  async startCall(): Promise<boolean> {
    try {
      if (!this.widget) {
        const initialized = await this.initializeVapi();
        if (!initialized) {
          return false;
        }
      }

      // Trigger the widget to start call
      if (this.widget) {
        // Simulate click on the widget to start call
        const event = new Event('click', { bubbles: true });
        this.widget.dispatchEvent(event);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      return false;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (this.widget) {
        // Try to end the call - this depends on the widget's API
        const event = new Event('end-call', { bubbles: true });
        this.widget.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Failed to end VAPI call:', error);
    }
  }

  isConfigured(): boolean {
    const publicKey = import.meta.env.VITE_VAPI_API_KEY;
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    return !!(publicKey && assistantId);
  }

  getWidget() {
    return this.widget;
  }
}

export const vapiService = new VapiService();