export interface FeatureFlagRecord {
	key: string;
	enabled: boolean;
	variant?: string | null;
	tenantId?: string | null;
}

export interface FeatureFlagClientOptions {
	getFlag: (key: string, tenantId?: string) => Promise<FeatureFlagRecord | null>;
	defaultTenantId?: string;
}

export class FeatureFlagClient {
	private readonly getFlagFn: FeatureFlagClientOptions['getFlag'];
	private readonly defaultTenantId?: string;

	constructor(options: FeatureFlagClientOptions) {
		this.getFlagFn = options.getFlag;
		this.defaultTenantId = options.defaultTenantId;
	}

	async isEnabled(key: string, tenantId?: string): Promise<boolean> {
		const flag = await this.getFlagFn(key, tenantId ?? this.defaultTenantId);
		return !!flag?.enabled;
	}

	async getVariant(key: string, tenantId?: string): Promise<string | null> {
		const flag = await this.getFlagFn(key, tenantId ?? this.defaultTenantId);
		return flag?.variant ?? null;
	}
}