'use client';

import { useState } from 'react';
import { UserForm } from '@/components/UserForm';
import { NotificationCenter } from '@/components/NotificationCenter';
import { sendUserInfo } from '@/lib/api';
import { UserInfo, BackendResponse } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Bell, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [response, setResponse] = useState<BackendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('status');

  const handleSubmit = async (userInfo: UserInfo) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await sendUserInfo(userInfo);
      setResponse(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to connect to backend'
      );
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status" className="gap-2">
              <CheckSquare className="h-4 w-4" />
              Submit Test
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* SUBMIT TAB */}
          <TabsContent value="status" className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!response && (
              <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
            )}

            {response && (
              <>
                <Alert variant="default">
                  <AlertTitle>Submitted Successfully</AlertTitle>
                  <AlertDescription>
                    The backend responded with:{" "}
                    <pre className="mt-2 whitespace-pre-wrap text-sm">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  Submit Again
                </Button>
              </>
            )}
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="mt-6">
            <NotificationCenter
              isVisible={activeTab === 'notifications'}
            />
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>PWA enabled - Install for offline access</p>
        </footer>
      </div>
    </main>
  );
}
