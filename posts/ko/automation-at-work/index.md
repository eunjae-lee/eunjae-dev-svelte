---
title: "일일히 번거롭게 직접 하지 맙시다"
excerpt: "실제로 자동화까지 이어지진 않더라도, 내가 해오고 있는 반복적인 업무가 뭔지 고민해보는 것만으로도 의미가 있을 것 같다."
created_at: 2019-05-28T00:00:00.000Z
lang: ko
---

얼마 전에 한 온라인 커뮤니티에서 본 이야기다. 어떤 사람이 엑셀 자료를 열심히 정리해서 상사에게 제출했다. 그런데 상사는 **"위험하게"** 수식을 썼다며 화를 냈다. 그리고 그는 엑셀 시트를 프린터로 인쇄하더니 계산기로 하나하나 두드리며 맞는지 확인했다고 한다. 차라리 그 노력을 수식이 맞게 짜였는지 확인하는데 썼으면 좋았을 텐데.

컴퓨터가 생긴 이후로 우리는 불필요한 반복은 최대한 컴퓨터에 맡기려 노력해왔다. 개발자가 갖는 가장 큰 장점 중 하나는, 자신의 업무 중 반복되는 부분이 있다면, 프로그램을 직접 만들어서 자동화시킬 수 있다는 것이다.

이 회사에는 크고 작게 자동화된 것들을 찾아볼 수 있다. 물론 내부에서 사용하는 도구를 만드는 팀이 별도로 있기 때문에 어느 정도 가능한 일일 것이다. 몇 가지를 소개하겠다.

**1.** **"팀원 여러분, 나 내일 휴가예요"**라고 슬랙(Slack, 업무용 메신저)에 입력하면, 자동으로 "휴가 신청했나요? -> [링크]"라는 메시지가 뜨면서 휴가 신청 사이트의 링크가 나타난다. 이는 슬랙의 Custom Responses 기능을 이용한 것이다.

**2.** 내가 일하는 팀에는 고객 문의를 응대하는 당직이 있다. 자동화된 툴이 당직 스케줄을 짜서 주초에 한 주간의 스케줄을 슬랙으로 공유해주며, 매일매일 그 날의 당번이 누구인지 알려준다. 그리고 그 날 하루 동안 처리해야 하는 문의 티켓을 당직인 사람에게 지속적으로 업데이트해준다.

**3.** #misc-today 라는 슬랙 채널에는 매일 아침 그 날의 요약을 보여준다. 다음과 같은 내용이 포함된다.

- 오늘 생일인 사람
- 오늘 면접 보러 오는 사람
- 오늘 입사 첫날인 사람
- 오늘 입사 N 주년인 사람
- 오늘 있을 큰 행사

그리고 이 내용은 회사 공동 구역에 놓인 모니터에도 사진과 함께 크게 표시된다. 커피를 마시다 모니터를 바라보면 누구에게 생일 축하 인사를 건넬지 알 수 있다.

**4.** 신규 입사자가 회사에 정착하기까지 약 3개월간 여러 가지 면에서 도움을 줄 온보딩 버디(Onboarding buddy)가 bot에 의해 매칭 된다. bot 이 먼저 랜덤 한 누군가에게 "xx의 온보딩 버디가 되시겠습니까?"라고 묻고, 그 사람이 수락하면, 해당 입사자의 입사 첫 날 아침에 자동으로 누가 누구의 버디인지 다시 한번 전사적으로 공지된다.

**5.** 새롭게 등록된 채용 공고가 슬랙에 자동으로 공유된다. 그리고 그 옆에 있는 링크를 누르면 현재 오픈된 모든 공고를 볼 수 있다.

**6.** 지난 하루 동안 생성된 새로운 채널 목록을 요약해서 보여주는 채널이 따로 있다. 이를 통해 다른 부서에서 어떤 일들이 벌어지는지 살펴볼 수 있다.

물론 주의해야 할 점은 몇 가지 있다.

1. 시간을 들여 자동화를 했지만, 결과적으로는 수동으로 하는 것과 별반 다르지 않을 수 있다. 너무 완벽한 자동화를 추구하기보다는 적정선에서 타협을 보며 반자동화를 하는 게 더 현명할 때도 있다.
2. 정형화된 패턴을 충분히 파악하기 전에 섣불리 자동화를 하면, 나중에 유지 보수하기 더 힘들어진다.
3. 회사나 부서에 따라 자동화를 하기 위해 들이는 시간을 업무로써 인정해 주지 않는 경우가 있다.

일상의 업무 중에 반복되는, 자동화할 만한 업무가 있을까? 실제로 자동화까지 이어지진 않더라도, 내가 해오고 있는 반복적인 업무가 뭔지 고민해보는 것만으로도 의미가 있을 것 같다.

