import React from 'react';

const codeColumns = [
    [
        <>
            <span className="code-token-keyword">const</span> api = <span className="code-token-function">createClient</span>();
        </>,
        <>
            <span className="code-token-keyword">import</span> {'{'} Router {'}'} <span className="code-token-keyword">from</span> <span className="code-token-string">'express'</span>;
        </>,
        <>
            <span className="code-token-keyword">function</span> <span className="code-token-function">buildPayload</span>() {'{'}
        </>,
        <>
            {'  '}<span className="code-token-keyword">return</span> {'{'} id, name, active: <span className="code-token-keyword">true</span> {'}'};
        </>,
        '}',
        <>
            <span className="code-token-keyword">await</span> <span className="code-token-function">fetch</span>(<span className="code-token-string">'/api/projects'</span>);
        </>,
        <>
            <span className="code-token-comment">// validate response schema</span>
        </>,
        <>
            <span className="code-token-keyword">if</span> (status {'>'} <span className="code-token-number">399</span>) <span className="code-token-keyword">throw</span> <span className="code-token-string">'RequestError'</span>;
        </>,
        <>
            <span className="code-token-function">setTheme</span>(prefersDark ? <span className="code-token-string">'dark'</span> : <span className="code-token-string">'light'</span>);
        </>,
        <>
            <span className="code-token-keyword">export default</span> app;
        </>,
    ],
    [
        <>
            <span className="code-token-keyword">type</span> Project = {'{'} id: <span className="code-token-type">string</span>; score: <span className="code-token-type">number</span> {'}'};
        </>,
        <>
            <span className="code-token-keyword">const</span> rows = data.<span className="code-token-function">map</span>((item) ={'>'} item.title);
        </>,
        <>
            <span className="code-token-keyword">for</span> (<span className="code-token-keyword">const</span> skill <span className="code-token-keyword">of</span> skills) {'{'}
        </>,
        <>
            {'  '}matrix.<span className="code-token-function">push</span>(<span className="code-token-function">normalize</span>(skill));
        </>,
        '}',
        <>
            <span className="code-token-keyword">useEffect</span>(() ={'>'} {'{'}
        </>,
        <>
            {'  '}window.<span className="code-token-function">addEventListener</span>(<span className="code-token-string">'resize'</span>, <span className="code-token-function">syncLayout</span>);
        </>,
        <>
            {'  '}<span className="code-token-keyword">return</span> () ={'>'} window.<span className="code-token-function">removeEventListener</span>(<span className="code-token-string">'resize'</span>, <span className="code-token-function">syncLayout</span>);
        </>,
        <>
            {'}'}, []);
        </>,
        <>
            route.<span className="code-token-function">setHeader</span>(<span className="code-token-string">'x-version'</span>, <span className="code-token-string">'2026.03'</span>);
        </>,
    ],
    [
        <>
            <span className="code-token-comment">/* animation frame loop */</span>
        </>,
        <>
            <span className="code-token-keyword">const</span> dt = now - lastTick;
        </>,
        <>
            progress = <span className="code-token-function">Math.min</span>(<span className="code-token-number">1</span>, progress + dt / <span className="code-token-number">1600</span>);
        </>,
        <>
            x = x + velocity * dt;
        </>,
        <>
            <span className="code-token-keyword">if</span> (x {'>'} bounds.max) x = bounds.min;
        </>,
        <>
            <span className="code-token-keyword">const</span> sql = <span className="code-token-string">'SELECT title, created_at FROM projects LIMIT 8'</span>;
        </>,
        <>
            <span className="code-token-keyword">class</span> <span className="code-token-type">PortfolioEngine</span> {'{'}
        </>,
        <>
            {'  '}<span className="code-token-function">render</span>() {'{'} <span className="code-token-keyword">return</span> frame; {'}'}
        </>,
        '}',
        <>
            <span className="code-token-keyword">export</span> {'{'} run, stop {'}'};
        </>,
    ],
];

const CodeBackground = ({ intensity = 'low' }) => {
    const intensityClass = intensity === 'high' ? 'code-background-high' : 'code-background-low';

    return (
        <div className={`code-background ${intensityClass}`} aria-hidden="true">
            {codeColumns.map((column, columnIndex) => {
                const repeatedLines = [...column, ...column, ...column];

                return (
                    <div className="code-background-column" key={`code-column-${columnIndex}`}>
                        {repeatedLines.map((line, lineIndex) => (
                            <div className="code-line" key={`line-${columnIndex}-${lineIndex}`}>
                                {line}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default CodeBackground;