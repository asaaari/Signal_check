'use client';

import { useState } from 'react';
import { UserForm } from '@/components/UserForm';
import { StatusLight } from '@/components/StatusLight';
import { sendUserInfo } from '@/lib/api';
import { UserInfo, BackendResponse } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [response, setResponse] = useState<BackendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (userInfo: UserInfo) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await sendUserInfo(userInfo);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">SignalCheck</h1>
          <p className="mt-2 text-muted-foreground">Integration Test App</p>
        </div>

        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!response && <UserForm onSubmit={handleSubmit} isLoading={isLoading} />}

          {response && (
            <>
              <StatusLight response={response} />
              <Button onClick={handleReset} variant="outline" className="w-full">
                Check Again
              </Button>
            </>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>PWA enabled - Install for offline access</p>
        </footer>
      </div>
    </main>
  );
}
