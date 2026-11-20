import { buildLlmsTxt, llmsResponse } from "@/lib/llms";

// Built once per deploy, like the pages it describes.
export const dynamic = "force-static";

export function GET() {
  return llmsResponse(buildLlmsTxt());
}
