import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <p>Please try again.</p>

          <button
            id="error-retry"
            onClick={this.handleRetry}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary