'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackendResponse } from '@/lib/types';

interface StatusLightProps {
  response: BackendResponse | null;
}

export function StatusLight({ response }: StatusLightProps) {
  if (!response) {
    return null;
  }

  const isGreen = response.status === 'green';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Status Check Result</CardTitle>
        <CardDescription>Response from backend</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
        <div
          className={`rounded-full p-6 ${
            isGreen ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          {isGreen ? (
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          ) : (
            <XCircle className="h-16 w-16 text-red-600" />
          )}
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold ${isGreen ? 'text-green-600' : 'text-red-600'}`}>
            {isGreen ? 'GREEN' : 'RED'}
          </p>
          {response.message && (
            <p className="mt-2 text-sm text-muted-foreground">{response.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
