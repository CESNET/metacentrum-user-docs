# Sandbox

![pic](intro-page-layout.png)

## Table formatting

| title1 | title2 | title3 |
|----|----|----|
| foo | goo | hoo |
| foo | goo | hoo |
| foo | goo | hoo |
| foo | goo | hoo |
| foo | goo | hoo |

## Mermaid graphs

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> |foo| D{Debug!};
  D --> E;
  B -->|No| E(Yay!);
  B --->|Dont know| F((wait));
```

``` mermaid
sequenceDiagram
  autonumber
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
      John->>John: Search Google and wiki
      John->>John: Think again
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```


``` mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```


``` mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

``` mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   checkout main
   merge develop
   commit
```

I need to highlight these ==very important words==.

I need to highlight these <mark>very important words</mark>.



``` mermaid
graph LR
  A[MetaCentrum] --> B[Prihlaseni a autorizace];
  A --> C[Moduly a softwary];
  A --> D[Jak uloha putuje frontami a planovacem];
  A --> E[Data a zachazeni s nimi];
  A --> F[OnDemand];
  A --> G[Infrastruktura];
  A --> H[Paralelni vypocty];
  A --> I[GPU vypocty];
```


