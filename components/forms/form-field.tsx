"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";

import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  multiline?: boolean;
} & React.ComponentProps<"input"> &
  React.ComponentProps<"textarea">;

/**
 * Campo com rótulo, erro e dica.
 *
 * O erro é sempre acompanhado de ícone e texto — cor nunca é o único
 * indicador (requisito WCAG, e proteção real para daltônicos).
 *
 * `aria-describedby` liga a mensagem ao campo para que leitores de tela a
 * anunciem; `role="alert"` faz o anúncio acontecer no momento do erro.
 */
export const FormField = React.forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  FormFieldProps
>(function FormField(
  { id, label, error, hint, required, multiline, ...props },
  ref,
) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const Component = multiline ? Textarea : Input;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? null : (
          <span className="ml-1.5 text-subtle">(opcional)</span>
        )}
      </Label>

      <Component
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...props}
      />

      {hint && !error ? (
        <p id={hintId} className="text-caption text-subtle">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-caption text-error"
        >
          <AlertCircle className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
});
