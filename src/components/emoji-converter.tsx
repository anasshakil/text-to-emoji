import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { ALPHABET_EMOJIS } from '@/utils/constant';
import { copyToClipboard } from '@/utils/helper';

export default function EmojiConverter() {
  const [text, setText] = useState('');
  const [emojis, setEmojis] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(
    copyToClipboard(() => setIsCopied(true)),
    [emojis],
  );

  useEffect(() => {
    const _text = text.toUpperCase();
    const _emojis = _text
      .split('')
      .map((char) => {
        const emoji = ALPHABET_EMOJIS.get(char);

        if (!emoji) return char;
        if (!Array.isArray(emoji)) return emoji;

        let permutations = '';

        for (const e of emoji) {
          permutations += `\n${e} `;
        }

        return permutations;
      })
      .join('');

    setEmojis(_emojis);
  }, [text]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center">Emoji Converter</h1>
        <p className="text-muted-foreground text-center">
          Type text and see it transformed into emojis
        </p>
      </div>

      <div className="space-y-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="text-lg h-12"
        />

        <Card className="relative">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Emoji Output</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(emojis)} disabled={!text}>
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[100px] p-4 bg-muted/50 rounded-md">
              <pre className="whitespace-pre-wrap break-words text-2xl">
                {emojis || 'Your emojis will appear here...'}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
