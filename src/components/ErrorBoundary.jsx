import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--pb-gray-bg)' }}>
          <div className="text-center max-w-sm">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FFF3E0' }}
            >
              <AlertTriangle size={28} style={{ color: '#E65100' }} />
            </div>
            <h1 className="font-semibold text-lg mb-2" style={{ color: 'var(--pb-text-primary)' }}>
              Something went wrong
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--pb-gray-text)' }}>
              Don't worry — your data is safe. Try refreshing the page.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 font-semibold text-white rounded-full cursor-pointer px-6 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--pb-orange-cta)',
                '--tw-ring-color': 'var(--pb-orange-cta)',
              }}
            >
              <RefreshCw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
