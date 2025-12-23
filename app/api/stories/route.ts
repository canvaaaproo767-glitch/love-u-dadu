import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Story from '@/lib/models/Story';

// CORS Headers (Ab PUT bhi allowed hai)
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 200 }));
}

// --- 1. GET (Read) ---
export async function GET() {
  await dbConnect();
  const stories = await Story.find({}).sort({ createdAt: -1 });
  const response = NextResponse.json(stories);
  return setCorsHeaders(response);
}

// --- 2. POST (Create New) ---
export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newStory = await Story.create(body);
    const response = NextResponse.json(newStory, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

// --- 3. PUT (Update Existing) - NEW FEATURE ---
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body; // ID alag nikala, baaki data update ke liye

    if (!_id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updatedStory = await Story.findByIdAndUpdate(_id, updateData, { new: true });
    
    const response = NextResponse.json(updatedStory);
    return setCorsHeaders(response);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- 4. DELETE (Remove) ---
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Story.findByIdAndDelete(id);
    const response = NextResponse.json({ message: "Deleted" });
    return setCorsHeaders(response);
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}