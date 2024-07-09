import { BlogCard } from "@/components/cards/blog-card";
import { CategoryCard } from "@/components/cards/category-card";
import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";
import { PostInterface } from "@/types/post";
import { LucideBookmark, LucideText } from "lucide-react";

type Props = {};

export const posts: PostInterface[] = [
  {
    title: "Understanding TypeScript",
    description:
      "An introductory guide to TypeScript, its benefits, and basic usage. This guide covers the basics of TypeScript, including its type system, how to set up a TypeScript project, and how to use TypeScript with existing JavaScript code. By the end of this guide, you'll have a solid understanding of how TypeScript can improve your development workflow and help catch errors early.",
    slug: "understanding-typescript",
    createdAt: "2024-07-10T10:00:00Z",
    content: `
    <h1>Understanding TypeScript</h1>
    <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It's designed for the development of large applications and transcompiles to JavaScript.</p>
    <h2>Benefits of TypeScript</h2>
    <p>Using TypeScript can greatly enhance your development workflow. Here are some of the key benefits:</p>
    <ul>
      <li><strong>Optional static typing:</strong> TypeScript allows you to add type definitions to your JavaScript code, helping to catch errors early in the development process.</li>
      <li><strong>Type inference:</strong> TypeScript can infer types, which reduces the amount of boilerplate code you need to write.</li>
      <li><strong>Compatibility with JavaScript:</strong> TypeScript is a superset of JavaScript, meaning any valid JavaScript code is also valid TypeScript code.</li>
      <li><strong>Enhanced IDE support:</strong> TypeScript provides better support for IDEs, offering features like code completion, navigation, and refactoring.</li>
    </ul>
    <h2>Getting Started with TypeScript</h2>
    <p>To start using TypeScript, you need to install it. You can do this via npm:</p>
    <pre><code>npm install -g typescript</code></pre>
    <p>Once installed, you can compile TypeScript files (.ts) into JavaScript files (.js) using the TypeScript compiler:</p>
    <pre><code>tsc your-file.ts</code></pre>
    <h2>TypeScript Basics</h2>
    <p>Let's look at some basic concepts in TypeScript:</p>
    <h3>Types</h3>
    <p>TypeScript introduces a type system to JavaScript. Here are some basic types:</p>
    <pre><code>
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
    </code></pre>
    <h3>Interfaces</h3>
    <p>Interfaces are a powerful way of defining contracts within your code:</p>
    <pre><code>
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "John", lastName: "Doe" };

console.log(greeter(user));
    </code></pre>
    <h3>Classes</h3>
    <p>TypeScript supports class-based object-oriented programming:</p>
    <pre><code>
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(\`\${this.name} moved \${distanceInMeters}m.\`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
sam.move();
    </code></pre>
    <h2>Conclusion</h2>
    <p>TypeScript is a powerful tool for developing large-scale applications. By adding static types to JavaScript, it helps catch errors early and provides a better development experience. Start exploring TypeScript today to see how it can benefit your projects.</p>
  `,
  },
  {
    title: "Advanced JavaScript Techniques",
    description:
      "A deep dive into advanced JavaScript concepts and patterns. This post explores various advanced techniques in JavaScript, such as closures, asynchronous programming, and design patterns. It also discusses best practices for writing clean, maintainable code, and provides examples of how to apply these techniques in real-world scenarios. Whether you're looking to improve your JavaScript skills or prepare for a technical interview, this guide has you covered.",
    slug: "advanced-javascript-techniques",
    createdAt: "2024-07-09T09:00:00Z",
    content: "",
  },
  {
    title: "Getting Started with Node.js",
    description:
      "A beginner's guide to setting up and using Node.js for backend development. This guide walks you through the process of installing Node.js, creating your first Node.js application, and understanding the basics of server-side JavaScript. It covers key concepts such as modules, asynchronous programming, and using npm for package management. By the end of this guide, you'll be ready to start building your own backend applications with Node.js.",
    slug: "getting-started-with-nodejs",
    createdAt: "2024-07-08T08:00:00Z",
    content: "",
  },
];

export const categories: CategoryInterface[] = [
  {
    title: "Web Development",
    description:
      "All about building websites and web applications using modern technologies and best practices.",
    slug: "web-development",
    createdAt: "2024-07-10T10:00:00Z",
    totalPosts: 25,
  },
  {
    title: "Programming Languages",
    description:
      "Exploring various programming languages, their features, and how to use them effectively.",
    slug: "programming-languages",
    createdAt: "2024-07-09T09:00:00Z",
    totalPosts: 18,
  },
  {
    title: "Backend Development",
    description:
      "Focus on server-side development, including databases, server management, and API creation.",
    slug: "backend-development",
    createdAt: "2024-07-08T08:00:00Z",
    totalPosts: 30,
  },
  {
    title: "Frontend Development",
    description:
      "Everything related to creating user interfaces and enhancing user experiences using HTML, CSS, and JavaScript.",
    slug: "frontend-development",
    createdAt: "2024-07-10T11:00:00Z",
    totalPosts: 20,
  },
];

export const HomeView = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10 mt-10">
        <div className="inline-flex item-center gap-2">
          <LucideBookmark />
          <h3 className="text-xl font-semibold">Featured Categories</h3>
        </div>

        <RouterLink
          className="text-primary-base text-sm"
          href={routes.categories.root}
        >
          View All
        </RouterLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.slug} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="inline-flex item-center gap-2">
          <LucideText />
          <h3 className="text-xl font-semibold">Featured Posts</h3>
        </div>

        <RouterLink
          className="text-primary-base text-sm"
          href={routes.posts.root}
        >
          View All
        </RouterLink>
      </div>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};
