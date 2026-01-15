// Logging infrastructure for Platform01 CMS
// Phase 3.3: Service Layer Implementation - Logging

// ========================================
// LOGGING TYPES
// ========================================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
  requestId?: string;
  userId?: string;
}

export interface LoggerOptions {
  level?: LogLevel;
  enableConsole?: boolean;
  enableFile?: boolean;
  logFilePath?: string;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

// ========================================
// LOGGER IMPLEMENTATION
// ========================================

export class Logger {
  private options: Required<LoggerOptions>;
  private requestId?: string;
  private userId?: string;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      level: options.level || LogLevel.INFO,
      enableConsole: options.enableConsole !== false,
      enableFile: options.enableFile || false,
      logFilePath: options.logFilePath || 'logs/cms.log',
      maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB
      maxFiles: options.maxFiles || 5
    };
  }

  // Set request context for tracking
  setRequestContext(requestId: string, userId?: string): void {
    this.requestId = requestId;
    this.userId = userId;
  }

  // Clear request context
  clearRequestContext(): void {
    this.requestId = undefined;
    this.userId = undefined;
  }

  // Debug logging
  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  // Info logging
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  // Warning logging
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  // Error logging
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  // Fatal logging
  fatal(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.FATAL, message, context, error);
  }

  // Main logging method
  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    if (level < this.options.level) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
      requestId: this.requestId,
      userId: this.userId
    };

    // Console logging
    if (this.options.enableConsole) {
      this.logToConsole(entry);
    }

    // File logging
    if (this.options.enableFile) {
      this.logToFile(entry);
    }
  }

  // Console logging with colors
  private logToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp;
    const levelStr = LogLevel[entry.level];
    const message = entry.message;
    const context = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
    const error = entry.error ? `\n${entry.error.stack}` : '';
    const requestInfo = entry.requestId ? ` [${entry.requestId}]` : '';

    const logMessage = `[${timestamp}] ${levelStr}${requestInfo}: ${message}${context}${error}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(logMessage);
        break;
      case LogLevel.INFO:
        console.info(logMessage);
        break;
      case LogLevel.WARN:
        console.warn(logMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(logMessage);
        break;
    }
  }

  // File logging
  private logToFile(entry: LogEntry): void {
    // In a real implementation, you would write to a file
    // For now, we'll just simulate file logging
    const logLine = JSON.stringify(entry) + '\n';
    
    // In production, you would use fs.appendFileSync or a proper logging library
    // fs.appendFileSync(this.options.logFilePath, logLine);
    
    // For now, we'll just log to console if file logging is enabled
    if (!this.options.enableConsole) {
      console.log(logLine.trim());
    }
  }
}

// ========================================
// SERVICE-SPECIFIC LOGGERS
// ========================================

export class CredentialsLogger extends Logger {
  constructor(options?: LoggerOptions) {
    super({
      ...options,
      logFilePath: options?.logFilePath || 'logs/credentials.log'
    });
  }

  logCreate(credential: any, userId?: string): void {
    this.info('Credential created', { 
      credentialId: credential.id, 
      title: credential.title, 
      type: credential.type,
      userId 
    });
  }

  logUpdate(credentialId: string, changes: any, userId?: string): void {
    this.info('Credential updated', { 
      credentialId, 
      changes, 
      userId 
    });
  }

  logDelete(credentialId: string, userId?: string): void {
    this.info('Credential deleted', { 
      credentialId, 
      userId 
    });
  }

  logError(operation: string, error: Error, context?: Record<string, any>): void {
    this.error(`Credentials ${operation} failed`, error, context);
  }
}

export class InsightsLogger extends Logger {
  constructor(options?: LoggerOptions) {
    super({
      ...options,
      logFilePath: options?.logFilePath || 'logs/insights.log'
    });
  }

  logCreate(insight: any, userId?: string): void {
    this.info('Insight created', { 
      insightId: insight.id, 
      title: insight.title, 
      author: insight.author,
      userId 
    });
  }

  logUpdate(insightId: string, changes: any, userId?: string): void {
    this.info('Insight updated', { 
      insightId, 
      changes, 
      userId 
    });
  }

  logDelete(insightId: string, userId?: string): void {
    this.info('Insight deleted', { 
      insightId, 
      userId 
    });
  }

  logPublish(insightId: string, userId?: string): void {
    this.info('Insight published', { 
      insightId, 
      userId 
    });
  }

  logError(operation: string, error: Error, context?: Record<string, any>): void {
    this.error(`Insights ${operation} failed`, error, context);
  }
}

// ========================================
// API LOGGING
// ========================================

export class APILogger extends Logger {
  constructor(options?: LoggerOptions) {
    super({
      ...options,
      logFilePath: options?.logFilePath || 'logs/api.log'
    });
  }

  logRequest(method: string, path: string, query?: any, body?: any, userId?: string): void {
    this.info('API Request', {
      method,
      path,
      query,
      body: body ? this.sanitizeBody(body) : undefined,
      userId
    });
  }

  logResponse(method: string, path: string, statusCode: number, responseTime: number, userId?: string): void {
    this.info('API Response', {
      method,
      path,
      statusCode,
      responseTime: `${responseTime}ms`,
      userId
    });
  }

  logError(method: string, path: string, error: Error, userId?: string): void {
    this.error('API Error', error, {
      method,
      path,
      userId
    });
  }

  private sanitizeBody(body: any): any {
    // Remove sensitive fields from logging
    const sensitiveFields = ['password', 'token', 'secret', 'key'];
    const sanitized = { ...body };
    
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }
    
    return sanitized;
  }
}

// ========================================
// GLOBAL LOGGER INSTANCES
// ========================================

// Create global logger instances
export const credentialsLogger = new CredentialsLogger();
export const insightsLogger = new InsightsLogger();
export const apiLogger = new APILogger();

// Main application logger
export const logger = new Logger({
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production'
});

// ========================================
// LOGGING UTILITIES
// ========================================

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function logPerformance<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  const startTime = Date.now();
  
  return fn().finally(() => {
    const duration = Date.now() - startTime;
    logger.info(`Performance: ${operation} completed in ${duration}ms`);
  });
}

export function logDatabaseQuery(query: string, params: any[], duration: number): void {
  logger.debug('Database Query', {
    query,
    params,
    duration: `${duration}ms`
  });
} 