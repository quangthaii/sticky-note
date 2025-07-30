import React from 'react';
import { textAreaStyles } from './TextArea.styles';
import type { VariantProps } from 'tailwind-variants';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaStyles> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={textAreaStyles({ variant, className })}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
export default React.memo(TextArea);
