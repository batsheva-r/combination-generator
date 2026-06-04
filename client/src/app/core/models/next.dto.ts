export interface NextRequest {
  n: number;
  index: string;
}

export interface NextResponse {
  index: string;
  permutation: number[];
  has_next: boolean;
}