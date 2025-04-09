import{_ as s,c as n,o as a,a as e}from"./app.f255723a.js";const h=JSON.parse('{"title":"Component","description":"","frontmatter":{},"headers":[{"level":2,"title":"What is a component?","slug":"what-is-a-component","link":"#what-is-a-component","children":[]},{"level":2,"title":"Basic Example","slug":"basic-example","link":"#basic-example","children":[]}],"relativePath":"api/component.md","lastUpdated":1744166887000}'),o={name:"api/component.md"},t=e(`<h1 id="component" tabindex="-1">Component <a class="header-anchor" href="#component" aria-hidden="true">#</a></h1><h2 id="what-is-a-component" tabindex="-1">What is a component? <a class="header-anchor" href="#what-is-a-component" aria-hidden="true">#</a></h2><p>A component can be defined as a modular unit of a software program that has well-defined interfaces and dependencies, allowing it to provide or request a set of services or functionalities.</p><p>To enable greater scalability and extensibility of the source code, this project uses a component-based architecture that allows you to create new functionalities that you can adapt to your needs.</p><h2 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-hidden="true">#</a></h2><p>Creating a new component is as simple as creating a class with the name of the component you want to use and making it inherit the functionalities of the <code>Component</code> class.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@cristianrg/game_engine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#676E95;">/* Avoid using arguments here... */</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// Implement whatever methods you need for your component</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>In the code above, you can see how easy it is to create your own components. However, you should avoid passing arguments in the constructor because not all components use the same parameters, which could cause errors when trying to retrieve the component.</p><p>Now you should be able to use your components!</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Entity</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TestComponent</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,10),p=[t];function l(c,r,i,y,d,D){return a(),n("div",null,p)}const m=s(o,[["render",l]]);export{h as __pageData,m as default};
