/**
 * Basic Info
 * @property {number} id - Option ID
 * @property {string} name - Option Name
 */
export interface BasicOptions {
    id: number;
    name: string;
}

/**
 * Basic Info with Translations and Alternates
 * @property {string[]} tns - Translations or Subtitles of Name
 * @property {string[]} alias - Alternates of Name
 */
export interface AdvancedOptions extends BasicOptions {
    tns: string[];
    alias: string[];
}
