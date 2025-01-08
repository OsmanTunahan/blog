"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Heading2,
  Quote,
  Pencil,
  Menu,
} from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [view, setView] = useState<"write" | "preview">("write");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?slug=${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const post = await response.json();
        
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category || '');
        // Tags will be added when we implement them in the Post interface
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/admin/posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, router]);

  const tools = [
    { icon: Bold, action: "bold", tooltip: "Bold" },
    { icon: Italic, action: "italic", tooltip: "Italic" },
    { icon: ListOrdered, action: "ordered-list", tooltip: "Ordered List" },
    { icon: List, action: "unordered-list", tooltip: "Unordered List" },
    { icon: LinkIcon, action: "link", tooltip: "Link" },
    { icon: ImageIcon, action: "image", tooltip: "Image" },
    { icon: Code, action: "code", tooltip: "Code Block" },
    { icon: Heading2, action: "heading", tooltip: "Heading" },
    { icon: Quote, action: "quote", tooltip: "Quote" },
  ];

  const handleToolbarAction = (action: string) => {
    const actions: { [key: string]: string } = {
      bold: "**Bold Text**",
      italic: "*Italic Text*",
      "ordered-list": "1. List item",
      "unordered-list": "- List item",
      link: "[Link Text](url)",
      image: "![Alt Text](image-url)",
      code: "```js\nconst example = 'code block';\nconsole.log(example);\n```",
      heading: "## Heading",
      quote: "> Quote",
    };

    const insertion = actions[action] || "";
    setContent((prev) => prev + "\n" + insertion);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/posts?slug=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update post');
      }
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const PostSettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white/60">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="border-white/10 bg-white/5 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] text-white">
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="cybersecurity">Cyber Security</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white/60">Tags</Label>
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas"
          className="border-white/10 bg-white/5 text-white placeholder:text-white/20"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white/60">SEO Preview</Label>
        <div className="rounded-lg bg-white/5 p-4">
          <h4 className="mb-1 text-sm font-medium text-blue-400">
            {title || "Post Title"}
          </h4>
          <p className="text-sm text-white/60 line-clamp-2">
            {content.slice(0, 160) || "Your post description will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#111111] px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Pencil className="h-4 w-4" />
            </div>
            <Link href="/admin/posts">
              <div>
                <h1 className="text-xl font-semibold">Edit Post</h1>
                <p className="hidden text-sm text-white/60 md:block">
                  Edit and update your blog post
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="block lg:hidden">
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/5 text-white border-white/10 hover:bg-white/10">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full border-white/10 bg-[#111111] p-6 sm:max-w-lg">
                <SheetTitle className="text-lg font-medium text-white">Post Settings</SheetTitle>
                <div className="mt-6">
                  <PostSettings />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Button
            onClick={handleUpdate}
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3 lg:p-6">
        <div className="lg:col-span-2">
          <div className="space-y-4 md:space-y-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="border-0 bg-white/5 text-lg md:text-xl font-medium placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-white/20"
            />

            <div className="rounded-lg bg-white/5 p-2">
              <div className="mb-4 flex items-center gap-2 overflow-x-auto border-b border-white/10 pb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`shrink-0 rounded-md px-3 py-1.5 text-sm ${
                    view === "write"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setView("write")}
                >
                  Write
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`shrink-0 rounded-md px-3 py-1.5 text-sm ${
                    view === "preview"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setView("preview")}
                >
                  Preview
                </Button>
              </div>

              {view === "write" && (
                <>
                  <div className="mb-2 flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-2">
                    {tools.map((tool) => (
                      <Button
                        key={tool.action}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 shrink-0 p-0 text-white/60 hover:bg-white/10 hover:text-white"
                        onClick={() => handleToolbarAction(tool.action)}
                        title={tool.tooltip}
                      >
                        <tool.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content in markdown..."
                    className="min-h-[300px] md:min-h-[500px] resize-none border-0 bg-transparent font-mono text-sm text-white placeholder:text-white/20 focus-visible:ring-0"
                  />
                </>
              )}

              {view === "preview" && (
                <div className="prose prose-invert max-w-none p-4">
                  <MarkdownPreview source={content} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden space-y-6 lg:block">
          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-medium">Post Settings</h3>
            <PostSettings />
          </div>
        </div>
      </div>
    </div>
  );
} 