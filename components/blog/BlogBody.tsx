import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  source: string;
};

export default function BlogBody({ source }: Props) {
  return (
    <div className="prose-blog">
      <MDXRemote source={source} />
    </div>
  );
}
