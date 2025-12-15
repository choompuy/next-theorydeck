import { NextResponse } from "next/server";
import { getDashboardOverview } from "@/features/dashboard/dashboard.service";

export async function GET() {
    const data = await getDashboardOverview();
    return NextResponse.json(data);
}
