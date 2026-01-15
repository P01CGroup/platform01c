import LoginForm from '@/components/admin/LoginForm';
import Logo from '@/components/ui/logo';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8">
        <div>
          <Logo className="fill-dark w-[132px] h-10" />
          <h2 className="mt-6 heading-3 font-heading font-normal text-dark">
            Platform01 Admin
          </h2>
          <p className="mt-2 text-sm text-dark/70 font-sans">
            Sign in to access the admin panel
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
} 