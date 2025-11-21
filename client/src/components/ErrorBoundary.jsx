// client/src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BugList Error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
          <h2>⚠️ Something went wrong rendering the bug list.</h2>
          <details className="mt-2 text-sm">
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;