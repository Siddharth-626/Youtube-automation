import * as React from 'react';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`bg-primary px-4 py-2 rounded ${props.className || ''}`} />;
}
