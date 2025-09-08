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

      const publicKey = import.meta.env.VITE_VAPI_API_KEY || 'b9726940-01fe-4cf4-a825-069f920295a2';
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'fd53cf66-ad56-4ed8-942b-9974266c0e3b';

      if (!publicKey || !assistantId) {
        console.warn('VAPI public key or Assistant ID not found in environment variables');
        return false;
      }

      console.log('Initializing VAPI with:', { publicKey, assistantId });

      // Create widget element
      const widgetElement = document.createElement('vapi-widget');
      widgetElement.setAttribute('assistant-id', assistantId);
      widgetElement.setAttribute('public-key', publicKey);
      widgetElement.setAttribute('show', 'false'); // Hide the default widget UI
      
      // Style the widget to be invisible but functional
      widgetElement.style.position = 'fixed';
      widgetElement.style.top = '-9999px';
      widgetElement.style.left = '-9999px';
      widgetElement.style.width = '1px';
      widgetElement.style.height = '1px';
      widgetElement.style.opacity = '0';
      widgetElement.style.pointerEvents = 'none';
      
      document.body.appendChild(widgetElement);

      // Add event listeners
      widgetElement.addEventListener('call-start', () => {
        console.log('VAPI call started');
      });

      widgetElement.addEventListener('call-end', () => {
        console.log('VAPI call ended');
      });

      widgetElement.addEventListener('error', (event: any) => {
        console.error('VAPI error:', event.detail);
      });

      // Wait a moment for the widget to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.widget = widgetElement;
      console.log('VAPI widget initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize VAPI:', error);
      return false;
    }
  }

  async startCall(): Promise<boolean> {
    try {
      console.log('Starting VAPI call...');
      
      if (!this.widget) {
        console.log('Widget not initialized, initializing now...');
        const initialized = await this.initializeVapi();
        if (!initialized) {
          console.error('Failed to initialize VAPI widget');
          return false;
        }
      }

      // Try multiple methods to start the call
      if (this.widget) {
        console.log('Attempting to start call via widget...');
        
        // Method 1: Try calling the start method if it exists
        if (typeof this.widget.start === 'function') {
          console.log('Using widget.start() method');
          this.widget.start();
        } 
        // Method 2: Dispatch a custom event
        else {
          console.log('Using custom start-call event');
          const startEvent = new CustomEvent('start-call', { bubbles: true });
          this.widget.dispatchEvent(startEvent);
        }
        
        return true;
      }

      console.error('Widget not available');
      return false;
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      return false;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (this.widget) {
        console.log('Ending VAPI call...');
        
        // Method 1: Try calling the stop method if it exists
        if (typeof this.widget.stop === 'function') {
          console.log('Using widget.stop() method');
          this.widget.stop();
        } 
        // Method 2: Dispatch a custom event
        else {
          console.log('Using custom end-call event');
          const endEvent = new CustomEvent('end-call', { bubbles: true });
          this.widget.dispatchEvent(endEvent);
        }
      }
    } catch (error) {
      console.error('Failed to end VAPI call:', error);
    }
  }

  isConfigured(): boolean {
    const publicKey = import.meta.env.VITE_VAPI_API_KEY || 'b9726940-01fe-4cf4-a825-069f920295a2';
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'fd53cf66-ad56-4ed8-942b-9974266c0e3b';
    return !!(publicKey && assistantId);
  }

  getWidget() {
    return this.widget;
  }
}

export const vapiService = new VapiService();