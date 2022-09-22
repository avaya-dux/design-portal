import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { defineComponent, h, createSSRApp } from 'vue';
import { renderToString as renderToString$1 } from 'vue/server-renderer';
import React, { createElement, useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/server';
import { escape } from 'html-escaper';
import { s as styles } from './chunks/a34db816.d8c7987b.mjs';
import * as $$module3 from '@avaya/neo-react';
import { Icon, Image, TopNav, Sheet, Button, NeoThemeProvider } from '@avaya/neo-react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { getHighlighter as getHighlighter$1 } from 'shiki';
import 'mime';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * This is the Vue + JSX equivalent of using `<div v-html="value" />`
 */
const StaticHtml$1 = defineComponent({
	props: {
		value: String,
		name: String,
	},
	setup({ name, value }) {
		if (!value) return () => null;
		return () => h('astro-slot', { name, innerHTML: value });
	},
});

function check$3(Component) {
	return !!Component['ssrRender'] || !!Component['__ssrInlineRender'];
}

async function renderToStaticMarkup$3(Component, props, slotted) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () => h(StaticHtml$1, { value, name: key === 'default' ? undefined : key });
	}
	const app = createSSRApp({ render: () => h(Component, props, slots) });
	const html = await renderToString$1(app);
	return { html };
}

const _renderer3 = {
	check: check$3,
	renderToStaticMarkup: renderToStaticMarkup$3,
};

function check$2(Component) {
	return Component['render'] && Component['$$render'];
}

async function renderToStaticMarkup$2(Component, props, slotted) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () =>
			`<astro-slot${key === 'default' ? '' : ` name="${key}"`}>${value}</astro-slot>`;
	}
	const { html } = Component.render(props, { $$slots: slots });
	return { html };
}

const _renderer2 = {
	check: check$2,
	renderToStaticMarkup: renderToStaticMarkup$2,
};

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check$1(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup$1(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$1(key);
		slots[name] = React.createElement(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	if (children != null) {
		newProps.children = React.createElement(StaticHtml, { value: children });
	}
	const vnode = React.createElement(Component, newProps);
	let html;
	if (metadata && metadata.hydrate) {
		html = ReactDOM.renderToString(vnode);
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToPipeableStreamAsync(vnode);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode);
		}
	}
	return { html };
}

async function renderToPipeableStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode));
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

const ASTRO_VERSION = "1.2.8";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function unescapeHTML(str) {
  if (!!str && typeof str === "object" && typeof str.then === "function") {
    return Promise.resolve(str).then((value) => {
      return markHTMLString(value);
    });
  }
  return markHTMLString(str);
}

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t)},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{_:process.env._,}))) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let html = "";
  for await (const chunk of renderAstroComponent(Component)) {
    html += stringifyChunk(result, chunk);
  }
  return html;
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (typeof child === "object" && Symbol.asyncIterator in child) {
    yield* child;
  } else {
    yield child;
  }
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        content += stringifyChunk(result, chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(content);
  }
  return fallback;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const children2 = {};
      if (slots) {
        await Promise.all(
          Object.entries(slots).map(
            ([key, value]) => renderSlot(result, value).then((output) => {
              children2[key] = output;
            })
          )
        );
      }
      const html2 = Component.render({ slots: children2 });
      return markHTMLString(html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          children[key] = output;
        })
      )
    );
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
const alreadyHeadRenderedResults = /* @__PURE__ */ new WeakSet();
function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (alreadyHeadRenderedResults.has(result)) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}
function defineStyleVars(defs) {
  let output = "";
  let arr = !Array.isArray(defs) ? [defs] : defs;
  for (const vars of arr) {
    for (const [key, value] of Object.entries(vars)) {
      if (value || value === 0) {
        output += `--${key}: ${value};`;
      }
    }
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let body = "";
        for await (const chunk of output) {
          let html = stringifyChunk(result, chunk);
          body += html;
        }
        return markHTMLString(body);
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$metadata$c = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/Description.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$d = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/Description.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$Description = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Description;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<p class="description astro-ZYJTVGMZ">${renderSlot($$result, $$slots["default"])}</p>

`;
});

const $$file$b = "/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/Description.astro";
const $$url$b = undefined;

const Description = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$c,
	default: $$Description,
	file: $$file$b,
	url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$b = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/PageTitle.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$c = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/PageTitle.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$PageTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$PageTitle;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<h1 class="page-title neo-bold astro-5SF3LL75">${renderSlot($$result, $$slots["default"])}</h1>

`;
});

const $$file$a = "/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/PageTitle.astro";
const $$url$a = undefined;

const PageTitle = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$b,
	default: $$PageTitle,
	file: $$file$a,
	url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$a = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SectionHeader.astro", { modules: [{ module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$b = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SectionHeader.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$SectionHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$SectionHeader;
  const { id } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`#${id}`, "href")} class="astro-6T22E3CN">
  <h2 class="section-heading neo-bold astro-6T22E3CN"${addAttribute(id, "id")}>
    ${renderSlot($$result, $$slots["default"])}

    ${renderComponent($$result, "Icon", Icon, { "icon": "link", "aria-label": "hyperlink icon", "class": "astro-6T22E3CN" })}
  </h2>
</a>

`;
});

const $$file$9 = "/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SectionHeader.astro";
const $$url$9 = undefined;

const SectionHeader = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$a,
	default: $$SectionHeader,
	file: $$file$9,
	url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SiteFooter.astro", { modules: [{ module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$a = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SiteFooter.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$SiteFooter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$SiteFooter;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<footer class="footer--wrapper astro-RTS7NY5S">
  <div class="footer__text--align astro-RTS7NY5S">
    ${renderComponent($$result, "Image", Image, { "src": "/imgs/footer-logo.svg", "alt": "Avaya logo", "class": "astro-RTS7NY5S" })}
  </div>

  <div class="footer__links--wrapper astro-RTS7NY5S">
    <a target="_blank" href="https://www.avaya.com/en/termsofuse/" class="astro-RTS7NY5S">
      Terms of Use
    </a>

    <a href="https://design.avayacloud.com/license" target="_blank" class="astro-RTS7NY5S">License</a>

    <a target="_blank" href="https://www.avaya.com/en/privacy/commitment/" class="astro-RTS7NY5S">
      Privacy
    </a>

    <a target="_blank" href="https://www.avaya.com/en/trademarks/" class="astro-RTS7NY5S">
      Trademarks
    </a>

    <a target="_blank" href="https://www.avaya.com/en/accessibility/" class="astro-RTS7NY5S">
      Accessibility
    </a>

    <a target="_blank" href="https://careers.avaya.com" class="astro-RTS7NY5S">Careers</a><a target="_blank" href="https://forms.office.com/pages/responsepage.aspx?id=bGOiBG0y_0iT-HCYdb06qT1-i9aD1eBFrVsGJdw_BopUMDkyT1o5R1lXR0dZM1o4OVlFMktWU0ZPUy4u" class="astro-RTS7NY5S">
      Newsletter
    </a>
  </div>

  <div class="footer__text--align astro-RTS7NY5S">
    <p class="footer__copyright neo-body-tiny neo-italic astro-RTS7NY5S">
      &copy; ${new Date().getFullYear()} Avaya, Inc.
    </p>
  </div>
</footer>

`;
});

const $$file$8 = "/Users/jsebast/dev/avaya-dux/design-portal/src/components/astro/SiteFooter.astro";
const $$url$8 = undefined;

const SiteFooter = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$9,
	default: $$SiteFooter,
	file: $$file$8,
	url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const SiteHeader = ({
  pathname,
  pages
}) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      const filteredPages = pages.filter((page) => page.title.toLowerCase().includes(lowerCaseSearch) || page.description.toLowerCase().includes(lowerCaseSearch));
      setOptions(filteredPages.length ? filteredPages : []);
    } else {
      setOptions([]);
    }
  }, [search]);
  const isActiveLink = useCallback((link) => pathname.startsWith(link), [pathname]);
  return /* @__PURE__ */ jsxs(TopNav, {
    logo: /* @__PURE__ */ jsx(Logo, {}),
    skipNav: /* @__PURE__ */ jsx(TopNav.SkipNav, {
      href: "#main-content",
      children: "Skip To Main Content"
    }),
    children: [/* @__PURE__ */ jsx(TopNav.LinkButton, {
      href: "/whats-new",
      active: isActiveLink("/whats-new"),
      rel: "prefetch",
      children: "What's New"
    }), /* @__PURE__ */ jsx(TopNav.LinkButton, {
      href: "/guidelines",
      active: isActiveLink("/guidelines"),
      rel: "prefetch",
      children: "Guidelines"
    }), /* @__PURE__ */ jsx(TopNav.LinkButton, {
      href: "/components",
      active: isActiveLink("/components"),
      rel: "prefetch",
      children: "Components"
    }), /* @__PURE__ */ jsx(TopNav.LinkButton, {
      href: "/icons",
      active: isActiveLink("/icons"),
      rel: "prefetch",
      children: "Icons"
    }), /* @__PURE__ */ jsx(TopNav.LinkButton, {
      href: "/faqs",
      active: isActiveLink("/faqs"),
      rel: "prefetch",
      children: "FAQs"
    }), /* @__PURE__ */ jsx(TopNav.Search, {
      onChange: (e) => setSearch(e.currentTarget.value),
      value: search
    }), /* @__PURE__ */ jsxs(Sheet, {
      className: styles["search-sheet-results"],
      open: options.length > 0,
      title: "Search Results",
      children: [/* @__PURE__ */ jsx("div", {
        className: styles["link-container"],
        children: options.map((option, i) => /* @__PURE__ */ jsx("a", {
          href: option.url || "/",
          children: option.title
        }, i))
      }), /* @__PURE__ */ jsx(Button, {
        onClick: () => setSearch(""),
        size: "wide",
        children: "Close"
      })]
    })]
  });
};
const Logo = () => {
  const {
    mobile,
    condensed,
    full
  } = useMemo(() => {
    const isDarkMode = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches || false;
    return {
      mobile: isDarkMode ? "/imgs/logo-mobile-dark.svg" : "/imgs/logo-mobile-light.svg",
      condensed: isDarkMode ? "/imgs/logo-condensed-dark.svg" : "/imgs/logo-condensed-light.svg",
      full: isDarkMode ? "/imgs/logo-full-dark.svg" : "/imgs/logo-full-light.svg"
    };
  }, []);
  return /* @__PURE__ */ jsx("a", {
    href: "/",
    "aria-label": "Homepage",
    children: /* @__PURE__ */ jsxs("picture", {
      children: [/* @__PURE__ */ jsx("source", {
        media: "(max-width: 1024px)",
        srcSet: mobile
      }), /* @__PURE__ */ jsx("source", {
        media: "(max-width: 1440px)",
        srcSet: condensed
      }), /* @__PURE__ */ jsx("img", {
        src: full,
        alt: "Avaya Logo"
      })]
    })
  });
};

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Description: $$Description,
	PageTitle: $$PageTitle,
	SectionHeader: $$SectionHeader,
	SiteFooter: $$SiteFooter,
	SiteHeader
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/layouts/Layout.astro", { modules: [{ module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: ["components"], hydrationDirectives: /* @__PURE__ */ new Set(["only"]), hoisted: [] });
const $$Astro$9 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/layouts/Layout.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const headerHeight = "65px";
  const footerHeight = "58px";
  const pages = (await Astro2.glob(/* #__PURE__ */ Object.assign({"../components/astro/Description.astro": () => Promise.resolve().then(() => Description),"../components/astro/PageTitle.astro": () => Promise.resolve().then(() => PageTitle),"../components/astro/SectionHeader.astro": () => Promise.resolve().then(() => SectionHeader),"../components/astro/SiteFooter.astro": () => Promise.resolve().then(() => SiteFooter),"../pages/components/buttons.astro": () => Promise.resolve().then(() => _page2),"../pages/components/index.astro": () => Promise.resolve().then(() => _page1),"../pages/faqs.astro": () => Promise.resolve().then(() => _page6),"../pages/guidelines.astro": () => Promise.resolve().then(() => _page3),"../pages/icons.astro": () => Promise.resolve().then(() => _page5),"../pages/index.astro": () => Promise.resolve().then(() => _page0),"../pages/whats-new.astro": () => Promise.resolve().then(() => _page4)}), () => "../**/*.astro")).filter((page) => page.title).map((page) => ({
    ...page,
    title: page.title,
    description: page.description
  }));
  const $$definedVars = defineStyleVars([{ headerHeight, footerHeight }]);
  const STYLES = [
    { props: { "define:vars": { headerHeight, footerHeight }, "data-astro-id": "4Y6U4472" }, children: `body{margin:0}body main:where(.astro-4Y6U4472){min-height:calc(100vh - var(--headerHeight) - var(--footerHeight));max-width:60rem;padding-bottom:2rem;margin:auto}` }
  ];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-4Y6U4472"${addAttribute($$definedVars, "style")}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title}</title>
  ${renderHead($$result)}</head>

  <body class="astro-4Y6U4472">
    ${renderComponent($$result, "NeoThemeProvider", NeoThemeProvider, { "initialMode": "dynamic", "class": "astro-4Y6U4472" }, { "default": () => renderTemplate`${renderComponent($$result, "SiteHeader", null, { "pathname": Astro2.url.pathname, "pages": pages, "client:only": "react", "client:component-hydration": "only", "class": "astro-4Y6U4472", "client:component-path": $$metadata$8.resolvePath("components"), "client:component-export": "SiteHeader" })}<main id="main-content" class="astro-4Y6U4472">
        ${renderSlot($$result, $$slots["default"])}
      </main>${renderComponent($$result, "SiteFooter", $$SiteFooter, { "class": "astro-4Y6U4472" })}` })}

    

    
  </body>
</html>`;
});

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Layout: $$Layout
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/index.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$8 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/index.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$6 = "Homepage";
const description$6 = "This is the landing page for Neo";
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Neo Homepage" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`Introducing Neo` })}${maybeRenderHead($$result)}<h2>Avaya's Design System</h2>${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    Neo is a library of flexible design components and guidelines, built upon
    our core principles and ready to be integrated into your digital products.
  ` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Getting Started` })}` })}`;
});

const $$file$7 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/index.astro";
const $$url$7 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$7,
	title: title$6,
	description: description$6,
	default: $$Index$1,
	file: $$file$7,
	url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

// Caches Promise<Highligher> for reuse when the same theme and langs are provided
const _resolvedHighlighters = new Map();

function stringify(opts) {
	// Always sort keys before stringifying to make sure objects match regardless of parameter ordering
	return JSON.stringify(opts, Object.keys(opts).sort());
}

/**
 * @param {import('shiki').HighlighterOptions} opts
 * @returns {Promise<import('shiki').Highlighter>}
 */
function getHighlighter(opts) {
	const key = stringify(opts);

	// Highlighter has already been requested, reuse the same instance
	if (_resolvedHighlighters.has(key)) {
		return _resolvedHighlighters.get(key);
	}

	// Start the async getHighlighter call and cache the Promise
	const highlighter = getHighlighter$1(opts).then((hl) => {
		hl.setColorReplacements({
			'#000001': 'var(--astro-code-color-text)',
			'#000002': 'var(--astro-code-color-background)',
			'#000004': 'var(--astro-code-token-constant)',
			'#000005': 'var(--astro-code-token-string)',
			'#000006': 'var(--astro-code-token-comment)',
			'#000007': 'var(--astro-code-token-keyword)',
			'#000008': 'var(--astro-code-token-parameter)',
			'#000009': 'var(--astro-code-token-function)',
			'#000010': 'var(--astro-code-token-string-expression)',
			'#000011': 'var(--astro-code-token-punctuation)',
			'#000012': 'var(--astro-code-token-link)',
		});
		return hl;
	});
	_resolvedHighlighters.set(key, highlighter);

	return highlighter;
}

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getHighlighter
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/node_modules/astro/components/Code.astro", { modules: [{ module: $$module1$2, specifier: "./Shiki.js", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$7 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/node_modules/astro/components/Code.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Code;
  const { code, lang = "plaintext", theme = "github-dark", wrap = false } = Astro2.props;
  function repairShikiTheme(html2) {
    html2 = html2.replace('<pre class="shiki"', '<pre class="astro-code"');
    if (wrap === false) {
      html2 = html2.replace(/style="(.*?)"/, 'style="$1; overflow-x: auto;"');
    } else if (wrap === true) {
      html2 = html2.replace(
        /style="(.*?)"/,
        'style="$1; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;"'
      );
    }
    return html2;
  }
  const highlighter = await getHighlighter({
    theme,
    langs: typeof lang !== "string" ? [lang] : void 0
  });
  const _html = highlighter.codeToHtml(code, { lang: typeof lang === "string" ? lang : lang.id });
  const html = repairShikiTheme(_html);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(html)}` })}
`;
});

const $$file$6 = "/Users/jsebast/dev/avaya-dux/design-portal/node_modules/astro/components/Code.astro";
const $$url$6 = undefined;

const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$6,
	default: $$Code,
	file: $$file$6,
	url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/node_modules/astro/components/Debug.astro", { modules: [{ module: $$module1$1, specifier: "./Code.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/node_modules/astro/components/Debug.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const $$Debug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Debug;
  const key = Object.keys(Astro2.props)[0];
  const value = Astro2.props[key];
  return renderTemplate`${maybeRenderHead($$result)}<div class="astro-debug">
	<div class="astro-debug-header">
		<h2 class="astro-debug-title">
			<span class="astro-debug-label">Debug</span>
			<span class="astro-debug-name">"${key}"</span>
		</h2>
	</div>

	${renderComponent($$result, "Code", $$Code, { "code": JSON.stringify(value, null, 2) })}
</div>

<style>
	.astro-debug {
		font-size: 14px;
		padding: 1rem 1.5rem;
		background: white;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.astro-debug-header,
	pre.astro-code {
		margin: -1rem -1.5rem 1rem;
		padding: 0.25rem 0.75rem;
	}

	.astro-debug-header {
		background: #ff1639;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.astro-debug-title {
		font-size: 1em;
		color: white;
		margin: 0.5em 0;
	}

	.astro-debug-label {
		font-weight: bold;
		text-transform: uppercase;
		margin-right: 0.75em;
	}

	pre.astro-code {
		border: 1px solid #eee;
		padding: 1rem 0.75rem;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		font-size: 14px;
	}
</style>`;
});

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Code: $$Code,
	Debug: $$Debug
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/index.astro", { modules: [{ module: $$module1, specifier: "astro/components", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module1$3, specifier: "layouts", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/index.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$5 = "Components";
const description$5 = "A collection of components for the Astro framework";
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Components Setup" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`Setup Web Components` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    Neo is a CSS framework built with reusable user interface components, guided
    by clear user experience standards, that are assembled to create a true
    cohesive experience for all Avaya products. Neo is set to support the latest
    2 versions of modern browsers.
  ` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    Can't find what you're looking for? Make a request for an icon, component or
    guideline here.
  ` })}${renderComponent($$result, "SectionHeader", $$SectionHeader, { "id": "compiled-css" }, { "default": () => renderTemplate`Compiled CSS` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    Download ready-to-use compiled .css files for Neo to easily drop into your
    project. This includes a separate stylesheet for icons.
  ` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    A word on fonts: Neo comes bundled with font family support for Latin, Greek
    and Cyrillic-based languages. However, support for text in Arabic, Hebrew,
    Chinese, Japanese and Korean at various font weights is available via
    separate stylesheets for each.
  ` })}${renderComponent($$result, "SectionHeader", $$SectionHeader, { "id": "install-instructions" }, { "default": () => renderTemplate`
    Install CSS via Node Package Manager
  ` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    To add the latest version of Neo to your project via Node Package Manager
    (npm), simply run the following command:
  ` })}${renderComponent($$result, "Code", $$Code, { "code": "npm install @avaya/neo", "lang": "bash" })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    The package contains both compiled and minified versions of the Neo .css
    file, as well as separate stylesheets for both icons and multilingual font
    support.
  ` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`
    The package contains both compiled and minified versions of the Neo .css
    file, as well as separate stylesheets for both icons and multilingual font
    support.
  ` })}` })}`;
});

const $$file$5 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/index.astro";
const $$url$5 = "/components";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$5,
	title: title$5,
	description: description$5,
	default: $$Index,
	file: $$file$5,
	url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/buttons.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/buttons.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$4 = "Button Component";
const description$4 = "The Neo Button component";
const $$Buttons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Buttons;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Buttons" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`Buttons` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`Buttons Page` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}` })}`;
});

const $$file$4 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/components/buttons.astro";
const $$url$4 = "/components/buttons";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$4,
	title: title$4,
	description: description$4,
	default: $$Buttons,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/guidelines.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/guidelines.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$3 = "Guidlines";
const description$3 = "Guidlines for building applications";
const $$Guidelines = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Guidelines;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Guidelines" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`Guidelines Placeholder` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`Lorem Ipsum` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}` })}`;
});

const $$file$3 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/guidelines.astro";
const $$url$3 = "/guidelines";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	title: title$3,
	description: description$3,
	default: $$Guidelines,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/whats-new.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/whats-new.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$2 = "What's New";
const description$2 = "Changelog and updates";
const $$WhatsNew = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WhatsNew;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "What's New" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`What's New Placeholder` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`Lorem Ipsum` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}` })}`;
});

const $$file$2 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/whats-new.astro";
const $$url$2 = "/whats-new";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	title: title$2,
	description: description$2,
	default: $$WhatsNew,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/icons.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/icons.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title$1 = "Icons";
const description$1 = "A collection of icons";
const $$Icons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Icons;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Icons" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`Icons Placeholder` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`Lorem Ipsum` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}` })}`;
});

const $$file$1 = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/icons.astro";
const $$url$1 = "/icons";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	title: title$1,
	description: description$1,
	default: $$Icons,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/faqs.astro", { modules: [{ module: $$module1$3, specifier: "layouts", assert: {} }, { module: $$module2, specifier: "components", assert: {} }, { module: $$module3, specifier: "@avaya/neo-react", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/@fs/Users/jsebast/dev/avaya-dux/design-portal/src/pages/faqs.astro", "https://design.avayacloud.com/", "file:///Users/jsebast/dev/avaya-dux/design-portal/");
const title = "FAQs";
const description = "Frequently asked questions";
const $$Faqs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faqs;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQs" }, { "default": () => renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, {}, { "default": () => renderTemplate`FAQs Placeholder` })}${renderComponent($$result, "Description", $$Description, {}, { "default": () => renderTemplate`Lorem Ipsum` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}${renderComponent($$result, "Button", Button, {}, { "default": () => renderTemplate`Example` })}` })}`;
});

const $$file = "/Users/jsebast/dev/avaya-dux/design-portal/src/pages/faqs.astro";
const $$url = "/faqs";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata,
	title,
	description,
	default: $$Faqs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/components/index.astro', _page1],['src/pages/components/buttons.astro', _page2],['src/pages/guidelines.astro', _page3],['src/pages/whats-new.astro', _page4],['src/pages/icons.astro', _page5],['src/pages/faqs.astro', _page6],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),Object.assign({"name":"@astrojs/svelte","clientEntrypoint":"@astrojs/svelte/client.js","serverEntrypoint":"@astrojs/svelte/server.js"}, { ssr: _renderer2 }),Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: _renderer3 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/components","type":"page","pattern":"^\\/components\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/index.astro","pathname":"/components","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/components/buttons","type":"page","pattern":"^\\/components\\/buttons\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}],[{"content":"buttons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components/buttons.astro","pathname":"/components/buttons","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/guidelines","type":"page","pattern":"^\\/guidelines\\/?$","segments":[[{"content":"guidelines","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guidelines.astro","pathname":"/guidelines","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/whats-new","type":"page","pattern":"^\\/whats-new\\/?$","segments":[[{"content":"whats-new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/whats-new.astro","pathname":"/whats-new","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/icons","type":"page","pattern":"^\\/icons\\/?$","segments":[[{"content":"icons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/icons.astro","pathname":"/icons","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/a34db816.de01d170.css"],"scripts":[{"type":"external","value":"page.3aa82516.js"}],"routeData":{"route":"/faqs","type":"page","pattern":"^\\/faqs\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs.astro","pathname":"/faqs","_meta":{"trailingSlash":"ignore"}}}],"site":"https://design.avayacloud.com/","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","components":"index.b98918a1.js","@astrojs/react/client.js":"client.7fee35b3.js","@astrojs/svelte/client.js":"client.b27523fa.js","@astrojs/vue/client.js":"client.f35f42c9.js","astro:scripts/page.js":"page.3aa82516.js","astro:scripts/before-hydration.js":""},"assets":["/assets/a34db816.de01d170.css","/client.7fee35b3.js","/client.b27523fa.js","/client.f35f42c9.js","/favicon.ico","/index.b98918a1.js","/page.3aa82516.js","/chunks/SiteHeader.module.2d4e0f81.js","/chunks/index.4167e04a.js","/imgs/footer-logo.svg","/imgs/logo-condensed-dark.svg","/imgs/logo-condensed-light.svg","/imgs/logo-full-dark.svg","/imgs/logo-full-light.svg","/imgs/logo-mobile-dark.svg","/imgs/logo-mobile-light.svg","/page.3aa82516.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
