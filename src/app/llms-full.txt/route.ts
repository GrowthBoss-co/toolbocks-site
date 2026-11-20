import { buildLlmsFullTxt, llmsResponse } from "@/lib/llms";

// Built once per deploy, like the posts it carries.
export const dynamic = "force-static";

export function GET() {
  return llmsResponse(buildLlmsFullTxt());
}
