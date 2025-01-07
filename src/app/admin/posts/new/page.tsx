"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link,
  Code,
  Heading2,
  Quote,
} from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkdownToolbarProps {
  onAction: (action: string) => void;
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onAction }) => {
  const tools = [
    { icon: Bold, action: "bold", tooltip: "Bold" },
    { icon: Italic, action: "italic", tooltip: "Italic" },
    { icon: ListOrdered, action: "ordered-list", tooltip: "Ordered List" },
    { icon: List, action: "unordered-list", tooltip: "Unordered List" },
    { icon: Link, action: "link", tooltip: "Link" },
    { icon: ImageIcon, action: "image", tooltip: "Image" },
    { icon: Code, action: "code", tooltip: "Code Block" },
    { icon: Heading2, action: "heading", tooltip: "Heading" },
    { icon: Quote, action: "quote", tooltip: "Quote" },
  ];

  return (
    <div className="flex items-center gap-1 border-b p-2">
      {tools.map((tool) => (
        <Button
          key={tool.action}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onAction(tool.action)}
          title={tool.tooltip}
        >
          <tool.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [view, setView] = useState<"write" | "preview">("write");

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

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
          <p className="text-muted-foreground">
            Create a new blog post with markdown support
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Publish</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="write"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                onClick={() => setView("write")}
              >
                Write
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                onClick={() => setView("preview")}
              >
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-0">
              <MarkdownToolbar onAction={handleToolbarAction} />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content in markdown..."
                className="min-h-[600px] resize-none rounded-none border-0 border-b font-mono text-sm focus-visible:ring-0"
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <div className="prose prose-stone dark:prose-invert max-w-none p-4">
                <MarkdownPreview source={content} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}