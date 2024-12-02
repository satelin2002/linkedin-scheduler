import {
  LinkedInPostCreate,
  LinkedInPostResponse,
  LinkedInMediaUpload,
} from "@/types/linkedin";

class LinkedInClient {
  private accessToken: string;
  private apiUrl = "https://api.linkedin.com/v2";

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async createPost(post: LinkedInPostCreate): Promise<LinkedInPostResponse> {
    const response = await fetch(`${this.apiUrl}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    return response.json();
  }

  async registerUpload(options: {
    type: "image" | "video";
    authorization?: string;
  }): Promise<LinkedInMediaUpload> {
    const response = await fetch(
      `${this.apiUrl}/assets?action=registerUpload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
            owner: options.authorization || `urn:li:person:${this.accessToken}`,
            serviceRelationships: [
              {
                relationshipType: "OWNER",
                identifier: "urn:li:userGeneratedContent",
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    return response.json();
  }

  async uploadImage(uploadUrl: string, file: File): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`LinkedIn upload error: ${response.statusText}`);
    }
  }
}

export const linkedin = new LinkedInClient(process.env.LINKEDIN_ACCESS_TOKEN!);
