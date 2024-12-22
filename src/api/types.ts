import type { AdvancedOptions, BasicOptions } from '../shared';

export interface SearchResult {
    songs: SongOptions[];
    searchQcReminder?: unknown;
    songCount: number;
}

export interface DetailResult {
    songs: LegacySongOptions[];
    equalizers: object;
}

/**
 * Fee Status of the Resource
 * - 0: Free
 * - 1: Need to Pay
 * - 4: VIP Only
 * - 8: Copyright Limited
 */
export type FeeStatus = 0 | 1 | 4 | 8;

export interface SongOptions extends Omit<AdvancedOptions, 'alias'> {
    /** Alias Name List */
    alia: string[];
    ar: AuthorOptions[];
    al: AlbumInfo;
    /** Popularity (0-100) */
    pop: number;
    fee: FeeStatus;
    privilege: PrivilegeInfo;
    noCopyrightRcmd?: NoCopyrightRecommendOptions;
    /** Published Timestamp */
    publishTime: number;
    version: number;
}

export interface AuthorOptions extends AdvancedOptions {}

export interface AlbumInfo extends Omit<AdvancedOptions, 'alias'> {
    /** Album Thumbnail URL */
    picUrl: string;
}

export interface PrivilegeInfo {
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    freeTrialPrivilege: FreeTrialPrivilegeInfo;
}

export interface FreeTrialPrivilegeInfo {
    /** Resource Requires Consumption (e.g., payment or VIP access) */
    resConsumable: boolean;
    userConsumable: boolean;
    listenType?: unknown;
    /** Cannot Listen Numeric Enum of Reason */
    cannotListenReason?: number;
}

export interface NoCopyrightRecommendOptions {
    /** Recommend Numeric Enum */
    type: number;
    /**
     * Recommend Description
     * @example
     * "其它版本可播"
     */
    typeDesc: string;
    /** Recommend Song ID */
    songId?: number;
}

export interface ArtistOptions extends Omit<AdvancedOptions, 'tns'> {
    trans?: string;
}

export interface LegacySongOptions extends Omit<AdvancedOptions, 'tns'> {
    artists: ArtistOptions[];
    transName?: string;
}
