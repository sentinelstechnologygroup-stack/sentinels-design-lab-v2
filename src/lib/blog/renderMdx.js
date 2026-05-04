import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

/**
 * Compiles an MDX string and returns the default export (a React component).
 * Uses the project's own react/jsx-runtime to avoid version conflicts.
 */
export async function compileMdxContent(source) {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    development: false,
  });

  const { default: Content } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return Content;
}
