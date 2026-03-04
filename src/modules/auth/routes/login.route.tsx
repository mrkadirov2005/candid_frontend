import { Alert, AlertDescription } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/shared/components/ui/card';
import { Input } from '#/shared/components/ui/input';
import { Label } from '#/shared/components/ui/label';
import { Link } from 'react-router';
import { useLoginForm } from '../hooks/use-login-form.hook';
import loginBackground from '../assets/login.background.png';

export function LoginRoute() {
  const { email, setEmail, password, setPassword, isPending, isDisabled, errorMessage, handleSubmit } = useLoginForm();

  return (
    <section className="flex items-center justify-center w-screen ">
      <div
        className="w-1/2 min-h-screen flex items-center justify-center bg-cover bg-center opacity-65 bg-no-repeat"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <CardTitle className="text-white text-4xl ">Welcome to LMS Platform</CardTitle>
      </div>
      <div className="flex items-center justify-center min-h-screen w-1/2  bg-white">
        <Card className="w-full max-w-sm border-0 shadow-none ">
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your LMS account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center  justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isDisabled}>
                  {isPending ? 'Signing in...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Link to="/resend-invite" className=" w-full pl-2 block text-sm underline-offset-4 hover:underline">
              Resend an invite
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
