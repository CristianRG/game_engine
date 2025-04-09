import{_ as o,c as p,b as s,w as e,a as t,r as n,o as c}from"./app.f255723a.js";const h=JSON.parse('{"title":"Quick Start \u{1F680}","description":"","frontmatter":{},"headers":[{"level":2,"title":"What will we do?","slug":"what-will-we-do","link":"#what-will-we-do","children":[]},{"level":2,"title":"Installation","slug":"installation","link":"#installation","children":[]},{"level":2,"title":"Creating your web application","slug":"creating-your-web-application","link":"#creating-your-web-application","children":[]},{"level":2,"title":"Creating the video game","slug":"creating-the-video-game","link":"#creating-the-video-game","children":[]},{"level":2,"title":"Result","slug":"result","link":"#result","children":[]}],"relativePath":"guide/quick-start.md","lastUpdated":1744166887000}'),r={name:"guide/quick-start.md"},F=t(`<h1 id="quick-start-\u{1F680}" tabindex="-1">Quick Start \u{1F680} <a class="header-anchor" href="#quick-start-\u{1F680}" aria-hidden="true">#</a></h1><h2 id="what-will-we-do" tabindex="-1">What will we do? <a class="header-anchor" href="#what-will-we-do" aria-hidden="true">#</a></h2><ul><li>Using your favorite framework, for example: <strong>Vue</strong>, <strong>React</strong>, etc., you will create a new application.</li><li>You will install the npm package using your favorite tool like <strong>npm</strong> or <strong>pnpm</strong>.</li><li>You will create the entry point for your video game and add an entity.</li><li>The entity will use a color of your choice and will be able to move.</li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><p>To install it in your project, use:</p><p>npm</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm i -D @cristianrg/game_engine</span></span>
<span class="line"></span></code></pre></div><p>pnpm</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add -D @cristianrg/game_engine</span></span>
<span class="line"></span></code></pre></div><h2 id="creating-your-web-application" tabindex="-1">Creating your web application <a class="header-anchor" href="#creating-your-web-application" aria-hidden="true">#</a></h2><p>Vite</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm create vite@latest</span></span>
<span class="line"></span></code></pre></div><p>When creating your application, it will ask you which framework you want to use. For this example, we will use <code>Vanilla</code> with <code>Typescript</code>.</p><h2 id="creating-the-video-game" tabindex="-1">Creating the video game <a class="header-anchor" href="#creating-the-video-game" aria-hidden="true">#</a></h2><p>In the <code>src</code> folder, create a file named <code>game.ts</code>. Once created, in your <code>game.ts</code> file, do the following:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Engine</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">GlobalState</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Entity</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Entities</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Transform</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Renderable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">InputKeys</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@cristianrg/game_engine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> setupGame </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">canvas</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLCanvasElement</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// create engine and get the current scene from the global state</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">engine</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Engine</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">canvas</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">GlobalState</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getInstance</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">scene</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">currentScene</span><span style="color:#89DDFF;">!;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// create player and add the main components</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">player</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Entity</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Transform</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">100</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Renderable</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">red</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// add Entities component to scene and add player to it</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">scene</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Entities</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">scene</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Entities</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#82AAFF;">addEntity</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">player</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// create input component and add it to player</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">input</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">InputKeys</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Map</span><span style="color:#F07178;">([</span></span>
<span class="line"><span style="color:#F07178;">        [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">player</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Transform</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">d</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">player</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Transform</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">w</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">player</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Transform</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">y</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">s</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">player</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Transform</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">y</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    ]))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">player</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addComponent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">input</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>In the file named <code>main.ts</code> located in <code>src</code>, replace the main logic with the following:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./style.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setupGame</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./game.ts</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">innerHTML </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;div style=&quot;display: flex; flex-direction: column; align-items: center;&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;canvas style=&quot;background: #1a1a1a; border-radius: 8px;&quot; id=&quot;canvas&quot; width=&quot;800&quot; height=&quot;600&quot;&gt;&lt;/canvas&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">setupGame</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLCanvasElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#canvas</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>Remember to import <code>setupGame</code> from <code>game.ts</code>.</p><h2 id="result" tabindex="-1">Result <a class="header-anchor" href="#result" aria-hidden="true">#</a></h2><p>To move, remember to use the keys &quot;a&quot;, &quot;w&quot;, &quot;s&quot;, and &quot;d&quot;.</p>`,21);function y(D,i,C,A,d,u){const a=n("QuickStart",!0),l=n("ClientOnly");return c(),p("div",null,[F,s(l,null,{default:e(()=>[s(a)]),_:1})])}const m=o(r,[["render",y]]);export{h as __pageData,m as default};
