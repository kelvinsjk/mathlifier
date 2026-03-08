# Bug Report: Trailing inline math `$...$` loses closing delimiter when preceded by display math starter `${{}}`

## Summary

The `x` tagged template function incorrectly handles the case where inline math (e.g., `$y$`) appears after a line break following a display math starter (`${{}}`). The closing `$` of the inline math is truncated.

## Minimal Reproduction

```js
import { x } from 'mathlifier';

// Bug: produces "$` x `\n$y" (missing trailing $)
x`${{}}x
$y$`;

// Workaround: adding a space after $y$ produces correct output
// "$` x `\n$`y` "
x`${{}}x
$y$ `;
```

## Root Cause

**Location:** `src/djot/djot.ts` (lines ~90-131, specifically the `Ce` function)

The issue is in the `Ce` function which handles state transitions. When processing `$y$` (inline math at end of string), the function incorrectly interprets the trailing `$` as a **display math starter** (`$$`) instead of an **inline math closer** (`$`).

### State Machine Flow

1. `${{}}` → sets `u=1` (inline math state), starts accumulating math content
2. `x` followed by newline → exits math state, outputs `$` x ``
3. `$y$` → `Ce` function is called with `t="$y$"`
4. `t.endsWith("$")` returns `true`, so `Ce` returns:
   - `u=2` (display math state)
   - `o=""` (empty accumulator for display math content)
   - `i = previous + "\n$y"` (the `$y` without trailing `$` is appended to output)

5. At the end of processing, the final `if (o)` check skips because `o` is empty

### The Bug in Code

```js
function Ce(t, e, n, s) {
  // BUG: This check catches BOTH $$ (display math) AND trailing $ in $y$ (inline math)
  if (t.endsWith("$"))
    return [
      2,              // Switch to display math state
      `${n}`,         // n is empty, so o becomes ""
      s + `${e}${t.slice(0, t.length - 1)}`,  // Appends "$y" (without trailing $) to output
      o
    ];
  // ... rest of function
}
```

The condition `t.endsWith("$")` is too broad. It should only trigger display math mode (`u=2`) when the string ends with `$$` (double dollar), not when it ends with a single `$` that is part of inline math like `$y$`.

## Suggested Fix

Change the condition in `Ce` function from:

```js
if (t.endsWith("$"))
```

to:

```js
if (t.endsWith("$$"))
```

This ensures that only `$$` (display math starter) triggers the transition to `u=2`, while `$y$` (inline math) would fall through to the default case and be handled as text (then later processed by the regex replacement in the `Ia` function).

## Impact

This bug affects any usage where:
1. A `${{}}` interpolation appears (starts display math mode)
2. Followed by a newline that exits the math mode
3. Followed by inline math `$...$` at the end of the string

The workaround is to add a space after the closing `$`, e.g., `$y$ ` instead of `$y$`.
