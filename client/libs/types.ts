export interface IFile {
  filename: string;    // User's original file name (e.g., 'photo.png')
  name: string;        // Optional: could be your saved file name or display name
  sizeInBytes: number; // Size as string (e.g., '2.5 MB' or '2048000')
  format: string;      // Format extension (e.g., 'jpeg', 'png', 'mp3')
  id?: string;         // Optional ID, usually set after saving in DB
}
