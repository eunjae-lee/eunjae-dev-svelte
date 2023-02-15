---
created_at: "2022-10-22T09:08:00.000Z"
slug: "css-in-js"
lang: "ko"
layout: "tweet"
tags: 
  - "dev"
title: "CSS in JS"
---

CSS-in-JS 쪽에 양대 산맥 중 하나인 Emotion 의 메인테이너 중 한 명이 본인 회사에서 CSS-in-JS 를 버리기로 했다는 글을 올렸어요. 꽤 자세한 글이라 짧게 함부로 요약하기가 애매하지만, build time CSS-in-JS 말고 runtime CSS-in-JS (styled-components & Emotion) 같은 경우

런타임에 라이브러리 번들 사이즈가 너무 크다는 점, re-rendering 이 지나치게 많이 발생해서 성능에 영향을 끼치는 점, SSR 를 하려 할 때 어렵다는 점 등을 이유로 꼽았네요.

대안을 몇가지 제안했는데, 결과적으로는 "빌드 타임에 정적인 css 파일을 만들어 내서 페이지에 포함 시키는"

결국엔 당연하면서도 원래 웹이 늘 그래온 방향을 제시했어요. 사실 Vue.js 나 Svelte 같은 경우에는 해당 컴포넌트로 scoped 된 스타일이 css 파일로 만들어지기 때문에 이런 Runtime CSS-in-JS 가 갖는 이슈은 가진 적이 없거든요.

이 스레드에 달린 댓글이나, 저 블로그 포스트에 달린 댓글도 궁금하시면 참고해보세요.

> Why We're Breaking Up with CSS-in-JS 
https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b by the 2nd most active maintainer of Emotion, a widely-popular CSS-in-JS library for React.
> [by @brucel](https://twitter.com/brucel/status/1582787411469533184)

저는 개인적으로 utility classes 접근을 지지하는 편이어서 Tailwind 를 쭉 써오고 있습니다.

"그래? 별로지 않아? 왜 그래야 해?" 하는 생각이 드시면 다음 글을 추천해요. 예제를 곁들여 쉽게 설명해줘요.

https://frontstuff.io/in-defense-of-utility-first-css

dotJS 2019 발표 영상도 있으니, 글보다 영상이 좋으신 분들은 참고하세요!

https://m.youtube.com/watch?v=R50q4NES6Iw

https://twitter.com/eunjae_lee_ko/status/1583732013999460355