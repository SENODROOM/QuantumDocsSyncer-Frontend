# QuantumDocsSyncer Frontend

**Modern React web application for managing automated documentation generation and synchronization**

## 🎯 Overview

The QuantumDocsSyncer frontend is a sophisticated React-based web interface that provides a user-friendly dashboard for managing automated documentation generation. It offers real-time monitoring, file management, and comprehensive control over the documentation generation process.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     User        │    │   Frontend      │    │    Backend      │
│   (Browser)     │◄──►│   (React)       │◄──►│   (Express)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  State Mgmt     │
                       │   (Redux)       │
                       └─────────────────┘
```

### Core Components

- **React Application**: Modern SPA with component-based architecture
- **State Management**: Redux Toolkit for predictable state management
- **UI Components**: Material-UI for consistent design system
- **Real-time Updates**: WebSocket integration for live updates
- **File Management**: Drag-and-drop file upload and management

## 🚀 Features

### 📊 Dashboard & Analytics
- **Real-time Statistics**: Live monitoring of documentation generation progress
- **File Overview**: Comprehensive view of all source files and their documentation status
- **Performance Metrics**: Generation time, success rates, and system health
- **Interactive Charts**: Visual representation of documentation coverage and quality

### 📁 File Management
- **File Browser**: Intuitive navigation through source code directories
- **Batch Operations**: Select and process multiple files simultaneously
- **File Status Tracking**: Visual indicators for documentation status (generated, outdated, error)
- **Search & Filter**: Powerful search capabilities with multiple filter options

### 📝 Documentation Editor
- **Live Preview**: Real-time preview of generated documentation
- **Markdown Editor**: Built-in markdown editor with syntax highlighting
- **Version History**: Track changes and revert to previous versions
- **Collaborative Editing**: Multi-user support with conflict resolution

### ⚙️ Configuration & Settings
- **Project Settings**: Configure documentation generation parameters
- **AI Model Selection**: Choose and configure AI models for analysis
- **Template Management**: Customize documentation templates
- **Export Options**: Multiple export formats (PDF, HTML, Markdown)

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Predictable state management
- **RTK Query** - Data fetching and caching
- **React Redux** - React bindings for Redux

### UI Components
- **Material-UI (MUI) v5** - React component library
- **Emotion** - CSS-in-JS styling solution
- **React Router v6** - Declarative routing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

### Additional Libraries
- **Axios** - HTTP client for API communication
- **Socket.io-client** - Real-time WebSocket connections
- **React Markdown** - Markdown rendering
- **Monaco Editor** - Code editor with syntax highlighting
- **Recharts** - Chart library for data visualization

## 📦 Installation

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher
- Git (for version control)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/SENODROOM/QuantumDocsSyncer.git
cd QuantumDocsSyncer/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

The application will open at http://localhost:3000

## ⚙️ Configuration

### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001

# Application Settings
VITE_APP_NAME=QuantumDocsSyncer
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_COLLABORATION=true
VITE_ENABLE_EXPORTS=true

# Development
VITE_DEV_TOOLS=true
```

### Application Config

```javascript
// src/config/app.ts
export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'QuantumDocsSyncer',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
  
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    collaboration: import.meta.env.VITE_ENABLE_COLLABORATION === 'true',
    exports: import.meta.env.VITE_ENABLE_EXPORTS === 'true'
  },
  
  ui: {
    theme: 'light',
    language: 'en',
    pageSize: 25
  }
};
```

## 🧩 Component Architecture

### Page Components
```
src/pages/
├── Dashboard/          # Main dashboard with statistics
├── FileManager/        # File browser and management
├── Documentation/      # Documentation viewer and editor
├── Settings/           # Application configuration
└── Analytics/          # Detailed analytics and reports
```

### Shared Components
```
src/components/
├── common/
│   ├── Layout/         # App layout and navigation
│   ├── Header/         # Application header
│   ├── Sidebar/        # Navigation sidebar
│   └── Footer/         # Application footer
├── file/
│   ├── FileBrowser/    # File tree component
│   ├── FileCard/       # File display card
│   └── FileUpload/     # Drag-and-drop upload
├── documentation/
│   ├── DocViewer/      # Markdown viewer
│   ├── DocEditor/      # Markdown editor
│   └── VersionHistory/ # Version control UI
└── charts/
    ├── StatsChart/     # Statistics visualization
    ├── ProgressChart/  # Progress tracking
    └── TrendChart/     # Trend analysis
```

### State Management

```typescript
// src/store/index.ts
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    files: filesSlice.reducer,
    docs: docsSlice.reducer,
    ui: uiSlice.reducer,
    api: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
});
```

## 🔌 API Integration

### API Client Configuration

```typescript
// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication error
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### RTK Query API

```typescript
// src/api/filesApi.ts
export const filesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query<FileInfo[], void>({
      query: () => '/api/files',
      providesTags: ['File']
    }),
    
    generateDocs: builder.mutation<Documentation, GenerateDocsRequest>({
      query: ({ filePath, options }) => ({
        url: '/api/docs/generate',
        method: 'POST',
        body: { filePath, options }
      }),
      invalidatesTags: ['File', 'Documentation']
    }),
    
    watchFiles: builder.mutation<void, WatchRequest>({
      query: (paths) => ({
        url: '/api/files/watch',
        method: 'POST',
        body: { paths }
      })
    })
  })
});
```

## 🎨 UI Components

### File Browser Component

```typescript
// src/components/file/FileBrowser.tsx
interface FileBrowserProps {
  files: FileInfo[];
  onFileSelect: (file: FileInfo) => void;
  onFileGenerate: (file: FileInfo) => void;
  selectedFiles: string[];
  onSelectionChange: (files: string[]) => void;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({
  files,
  onFileSelect,
  onFileGenerate,
  selectedFiles,
  onSelectionChange
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <FileBrowserHeader
        selectedCount={selectedFiles.length}
        onBatchGenerate={() => {/* Handle batch generation */}}
      />
      
      <TreeView
        items={files}
        expanded={expandedFolders}
        onToggle={(folder) => setExpandedFolders(prev => 
          new Set([...prev, folder])
        )}
        renderItem={(item) => (
          <FileTreeItem
            item={item}
            selected={selectedFiles.includes(item.path)}
            onSelect={() => onFileSelect(item)}
            onGenerate={() => onFileGenerate(item)}
            onSelectionChange={(selected) => 
              onSelectionChange(
                selected 
                  ? [...selectedFiles, item.path]
                  : selectedFiles.filter(f => f !== item.path)
              )
            }
          />
        )}
      />
    </Box>
  );
};
```

### Documentation Viewer

```typescript
// src/components/documentation/DocViewer.tsx
export const DocViewer: React.FC<DocViewerProps> = ({ 
  filePath, 
  content, 
  isLoading,
  onEdit 
}) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={filePath}
        action={
          <IconButton onClick={() => onEdit(filePath)}>
            <EditIcon />
          </IconButton>
        }
      />
      
      <Divider />
      
      <CardContent sx={{ flex: 1, overflow: 'auto' }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <ReactMarkdown
            components={markdownComponents}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        )}
      </CardContent>
    </Card>
  );
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### Layout Adaptation

```typescript
// src/hooks/useResponsive.ts
export const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    getLayoutProps: () => ({
      sidebarWidth: isMobile ? 0 : isTablet ? 240 : 280,
      headerHeight: 64,
      contentPadding: isMobile ? 1 : 2
    })
  };
};
```

## 🔄 Real-time Updates

### WebSocket Integration

```typescript
// src/hooks/useWebSocket.ts
export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const newSocket = io(url);
    
    newSocket.on('connect', () => {
      setConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      setConnected(false);
    });
    
    newSocket.on('docs:generated', (data: DocumentationUpdate) => {
      // Update store with new documentation
      store.dispatch(docsSlice.actions.updateDocumentation(data));
    });
    
    newSocket.on('file:changed', (data: FileChange) => {
      // Update file status
      store.dispatch(filesSlice.actions.updateFileStatus(data));
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, [url]);
  
  return { socket, connected };
};
```

## 🧪 Development

### Running Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format

# Pre-commit hooks
npm run prepare
```

### Development Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Environment Configuration
```bash
# Vercel environment variables
vercel env add VITE_API_BASE_URL
vercel env add VITE_WS_URL
```

### Custom Domain
```bash
# Add custom domain
vercel domains add yourdomain.com
```

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    // PWA plugin for offline support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@mui/icons-material'],
          charts: ['recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material']
  }
});
```

## 🔒 Security

### Authentication
- JWT token-based authentication
- Secure token storage in localStorage
- Automatic token refresh
- Route protection for authenticated areas

### Data Protection
- Input validation and sanitization
- XSS protection through React's built-in safeguards
- CSRF protection via same-site cookies
- Secure API communication over HTTPS

### Security Headers
```typescript
// src/security/headers.ts
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
```

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache
npm run build -- --force

# Update dependencies
npm update

# Check for version conflicts
npm ls
```

**Development Server Issues**
```bash
# Check port availability
netstat -an | grep :3000

# Clear Vite cache
rm -rf node_modules/.vite

# Reset node modules
rm -rf node_modules package-lock.json
npm install
```

**API Connection Issues**
```bash
# Check backend connectivity
curl http://localhost:3001/api/health

# Verify CORS configuration
curl -H "Origin: http://localhost:3000" \
     http://localhost:3001/api/files
```

### Debug Mode
```bash
# Enable debug logging
VITE_DEBUG=true npm run dev

# Network inspection
VITE_NETWORK_INSPECT=true npm run dev
```

## 📈 Performance Optimization

### Bundle Optimization
- **Code Splitting**: Automatic code splitting by routes
- **Tree Shaking**: Remove unused code
- **Lazy Loading**: Load components on demand
- **Image Optimization**: Optimize images and assets

### Runtime Optimization
```typescript
// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

// Memoization for expensive computations
const expensiveComputation = useMemo(() => {
  return computeComplexData(data);
}, [data]);

// Debounced search
const debouncedSearch = useMemo(
  () => debounce(searchFiles, 300),
  []
);
```

### Caching Strategy
- **Service Worker**: Offline support and caching
- **HTTP Caching**: Proper cache headers for API responses
- **Local Storage**: Cache frequently accessed data
- **Memory Management**: Proper cleanup and garbage collection

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Use Material-UI components consistently
- Write comprehensive tests
- Document public APIs

### Component Guidelines
```typescript
// Component template
interface ComponentProps {
  // Define props with TypeScript
}

export const Component: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2 
}) => {
  // Component logic
  
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/SENODROOM/QuantumDocsSyncer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SENODROOM/QuantumDocsSyncer/discussions)
- **Email**: frontend@quantumdocs.com

---

*Built with ❤️ and React for the Quantum Language documentation ecosystem*
