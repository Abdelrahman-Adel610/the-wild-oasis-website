# 🏔️ The Wild Oasis - Luxury Cabin Booking Website

A modern, full-stack web application for booking luxury cabins in the Italian Dolomites. Built with Next.js 15, featuring user authentication, real-time booking management, and integrated payment processing.

![Logo Image](image.png)

## 🌟 Features

### 🏠 Cabin Management

- **Browse Luxury Cabins**: View detailed information about 8 luxury cabins
- **Smart Filtering**: Filter cabins by capacity (small, medium, large)
- **High-Quality Images**: Optimized images with Next.js Image component
- **Responsive Design**: Seamless experience across all devices

### 👤 User Experience

- **OAuth Authentication**: Sign in with Google or GitHub
- **Guest Profiles**: Automatic guest creation and profile management
- **Personalized Dashboard**: Manage bookings and personal information
- **Reservation Context**: Persistent booking state across the application

### 📅 Booking System

- **Real-time Availability**: Check cabin availability with date picker
- **Booking Management**: Create, view, update, and cancel reservations
- **Payment Integration**: Secure payment processing with Stripe
- **Booking History**: View past and upcoming reservations

### 🎨 Modern UI/UX

- **Tailwind CSS**: Beautiful, responsive design system
- **Custom Fonts**: Josefin Sans for elegant typography
- **Dark Theme**: Eye-friendly dark color scheme
- **Loading States**: Smooth loading experiences with Suspense

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Optimized image loading
- **[Heroicons](https://heroicons.com/)** - Beautiful SVG icons

### Backend & Database

- **[Supabase](https://supabase.com/)** - PostgreSQL database and authentication
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Server-side functionality

### Authentication & Payments

- **[NextAuth.js 5](https://next-auth.js.org/)** - Authentication solution
- **[Stripe](https://stripe.com/)** - Payment processing
- **OAuth Providers**: Google, GitHub

### Development Tools

- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[ESLint](https://eslint.org/)** - Code linting
- **[Date-fns](https://date-fns.org/)** - Date utility library

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, **pnpm**, or **bun**
- **Supabase account** for database
- **Google/GitHub OAuth apps** for authentication
- **Stripe account** for payments

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GIT_ID=your_github_client_id
AUTH_GIT_SECRET=your_github_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdelrahman-Adel610/the-wild-oasis-website.git
   cd the-wild-oasis-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   - Copy `.env.local.example` to `.env.local`
   - Fill in your environment variables

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
the-wild-oasis-website/
├── app/                          # Next.js App Router
│   ├── _components/              # Reusable components
│   │   ├── Header.js
│   │   ├── Navigation.js
│   │   ├── CabinCard.js
│   │   ├── Filter.js
│   │   ├── Spinner.js
│   │   └── ReservationContext.js
│   ├── _lib/                     # Utility functions
│   │   ├── auth.js               # Authentication configuration
│   │   ├── data-service.js       # Database operations
│   │   └── supabase.js           # Supabase client
│   ├── _styles/                  # Global styles
│   │   └── globals.css
│   ├── about/                    # About page
│   │   └── page.js
│   ├── cabins/                   # Cabins pages
│   │   ├── page.js
│   │   └── CabinList.js
│   ├── account/                  # User account pages
│   ├── api/                      # API routes
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage
├── public/                       # Static assets
│   ├── bg.png
│   ├── about-1.jpg
│   └── about-2.jpg
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

## 🎯 Key Features Explained

### Authentication Flow

- Users can sign in with Google or GitHub
- Automatic guest profile creation on first sign-in
- Persistent authentication state across the application

### Booking System

- Real-time cabin availability checking
- Date range selection with conflict prevention
- Secure payment processing through Stripe
- Booking confirmation and management

### Data Management

- Supabase PostgreSQL database
- Real-time data synchronization
- Optimistic UI updates for better UX

## 📱 Pages Overview

- **🏠 Homepage (`/`)**: Hero section with call-to-action
- **🏕️ Cabins (`/cabins`)**: Browse and filter available cabins
- **ℹ️ About (`/about`)**: Company information and history
- **👤 Account (`/account`)**: User dashboard and booking management
- **🔐 Login (`/login`)**: Authentication page

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Connect your repository** to [Vercel](https://vercel.com)
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Manual Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- ESLint configured for Next.js best practices
- Tailwind CSS for consistent styling
- TypeScript support (can be enabled)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE).
