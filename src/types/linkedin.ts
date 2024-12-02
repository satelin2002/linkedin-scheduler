export interface LinkedInPostCreate {
  author: string;
  commentary: string;
  visibility: "anyone" | "connections" | "logged-in" | "organization";
  media?: {
    asset: string;
    status: "READY";
    title?: string;
  }[];
  scheduledTime?: number;
}

export interface LinkedInPostResponse {
  id: string;
  postUrl: string;
  distribution: {
    feedDistribution: string;
    targetingCriteria: unknown;
  };
}

export interface LinkedInMediaUpload {
  uploadUrl: string;
  asset: string;
}
