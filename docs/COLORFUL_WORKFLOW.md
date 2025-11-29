# NUDGE Colorful Workflow Diagrams

> **Circular, colorful workflows showing the continuous cycle of habit tracking with Coach Nudge**

---

## 🔄 Main Habit Tracking Cycle

```mermaid
graph TB
    User([👤 User])
    
    User --> AddHabit[Add New Habit<br/>Morning run]
    
    AddHabit --> Validate[Validate Habit<br/>Check if healthy]
    
    Validate --> Assign[Auto-Assign Emoji<br/>🏃‍♂️ Running]
    
    Assign --> Track[Track Daily<br/>Mark as done]
    
    Track --> UpdateStats[Update Stats<br/>Streak + Progress]
    
    UpdateStats --> CheckProgress{100%<br/>Complete?}
    
    CheckProgress -->|Yes| Celebrate[🎉 Celebration<br/>Modal appears]
    CheckProgress -->|No| Continue[Continue<br/>Tracking]
    
    Celebrate --> TinyWins[View Tiny Wins<br/>See achievements]
    Continue --> TinyWins
    
    TinyWins --> CoachNudge[Ask Coach Nudge<br/>How am I doing?]
    
    CoachNudge --> AIResponse[Get AI Feedback<br/>Personalized encouragement]
    
    AIResponse --> Motivated[Feel Motivated<br/>Ready for more]
    
    Motivated --> AddHabit
    
    style User fill:#2d2d2d,stroke:#ff9f66,stroke-width:3px,color:#fff
    style AddHabit fill:#e0f2fe,stroke:#0ea5e9,stroke-width:3px,color:#000
    style Validate fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Assign fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Track fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style UpdateStats fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style CheckProgress fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000
    style Celebrate fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
    style Continue fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style TinyWins fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style CoachNudge fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style AIResponse fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Motivated fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
```

---

## 🤖 Coach Nudge AI Interaction Cycle

```mermaid
graph TB
    User([👤 User])
    
    User --> Question[User Question<br/>How am I doing?]
    
    Question --> GatherStats[Gather Current Stats<br/>Completed/Total/Streak]
    
    GatherStats --> BuildPrompt[Build System Prompt<br/>Stats + Personality]
    
    BuildPrompt --> CallAPI[Call OpenRouter API<br/>GPT-OSS-20B model]
    
    CallAPI --> GenerateResponse[Generate Response<br/>AI analyzes progress]
    
    GenerateResponse --> ValidateResponse[Validate Response<br/>Check tone & length]
    
    ValidateResponse --> DisplayMessage[Display Message<br/>Show in chat bubble]
    
    DisplayMessage --> UserReads[User Reads<br/>Feels encouraged]
    
    UserReads --> NextAction{Take<br/>Action?}
    
    NextAction -->|Mini Task| MiniChallenge[Get Mini Task<br/>3 sips of water]
    NextAction -->|Mark Done| MarkHabit[Mark Habit Done<br/>Update streak]
    NextAction -->|Ask Again| Question
    
    MiniChallenge --> Complete[Complete Task<br/>Click I did it]
    MarkHabit --> Complete
    
    Complete --> Celebration[Get Celebration<br/>Tiny win! 🎉]
    
    Celebration --> User
    
    style User fill:#2d2d2d,stroke:#ff9f66,stroke-width:3px,color:#fff
    style Question fill:#dbeafe,stroke:#3b82f6,stroke-width:3px,color:#000
    style GatherStats fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style BuildPrompt fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style CallAPI fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style GenerateResponse fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style ValidateResponse fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style DisplayMessage fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style UserReads fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
    style NextAction fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000
    style MiniChallenge fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style MarkHabit fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Complete fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Celebration fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
```

---

## 🎯 Habit Lifecycle Cycle

```mermaid
graph TB
    Start([New User])
    
    Start --> Welcome[Welcome Modal<br/>Enter your name]
    
    Welcome --> Dashboard[Today Dashboard<br/>See greeting + stats]
    
    Dashboard --> AddFirst[Add First Habit<br/>Type habit name]
    
    AddFirst --> EmojiAssign[Smart Emoji Engine<br/>Auto-assigns icon]
    
    EmojiAssign --> HabitList[Habit Appears<br/>In your list]
    
    HabitList --> DailyUse[Daily Usage<br/>Mark habits done]
    
    DailyUse --> StreakBuilds[Streak Builds<br/>Consecutive days]
    
    StreakBuilds --> Progress[Progress Ring Fills<br/>Completion %]
    
    Progress --> CheckComplete{All Done<br/>Today?}
    
    CheckComplete -->|Yes| Modal[Celebration Modal<br/>Did you feel good?]
    CheckComplete -->|No| Wins[View Tiny Wins<br/>Partial progress]
    
    Modal --> Response{User<br/>Response}
    
    Response -->|Amazing| Happy[Positive Feedback<br/>Logged ✨]
    Response -->|Need Help| Support[Needs Support<br/>Logged 💪]
    
    Happy --> NextDay[Next Day Arrives<br/>Reset completion]
    Support --> CoachHelp[Coach Nudge<br/>Offers encouragement]
    Wins --> NextDay
    
    CoachHelp --> NextDay
    
    NextDay --> DailyUse
    
    style Start fill:#2d2d2d,stroke:#ff9f66,stroke-width:3px,color:#fff
    style Welcome fill:#dbeafe,stroke:#3b82f6,stroke-width:3px,color:#000
    style Dashboard fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style AddFirst fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style EmojiAssign fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style HabitList fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style DailyUse fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style StreakBuilds fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Progress fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style CheckComplete fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000
    style Modal fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
    style Wins fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style Response fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000
    style Happy fill:#dcfce7,stroke:#10b981,stroke-width:3px,color:#000
    style Support fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style NextDay fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
    style CoachHelp fill:#fce7f3,stroke:#ec4899,stroke-width:3px,color:#000
```

---

## 🎨 Color Legend

| Color | Component Type | Example |
|-------|---------------|---------|
| 🟠 **Orange/Dark** | User/Start Point | User, New User |
| 🔵 **Blue** | Input/Question | User Question, Welcome Modal |
| 🩷 **Pink** | Processing Steps | Validate, Build Prompt, Track Daily |
| 🟡 **Yellow** | Decisions | 100% Complete?, User Response? |
| 🟢 **Green** | Success/Output | Celebration, Final Output, Motivated |

---

## 📊 Reference Image

![Example Workflow Style](file:///Users/aryansubhash/.gemini/antigravity/brain/1a358a92-a5e2-4595-a504-28856f216b8e/uploaded_image_1764386907560.png)

*Workflow style inspired by circular AI processing diagrams*

---

**Created**: November 29, 2025  
**Purpose**: Visual circular workflows showing continuous cycles in NUDGE habit tracking


## Complete User Journey with Coach Nudge

```mermaid
flowchart TD
    Start([🚀 Open NUDGE]) --> Welcome{First time<br/>visitor?}
    
    Welcome -->|Yes| Name[📝 Enter Your Name<br/>Welcome Modal]
    Welcome -->|No| Dashboard
    
    Name --> Dashboard[📊 Today Dashboard<br/>🌅 Greeting + Progress Ring]
    
    Dashboard --> Choice1{What do you<br/>want to do?}
    
    Choice1 -->|Add habits| AddHabit[➕ Add a Habit<br/>Type: Morning run]
    Choice1 -->|Check progress| ViewStats[📈 View Stats<br/>Done/Total/Streak]
    Choice1 -->|Get motivated| Quotes[💬 Read Athlete Quotes<br/>Auto-rotating carousel]
    
    AddHabit --> Validate{Healthy<br/>habit?}
    Validate -->|No 🚫| Warning[⚠️ Unhealthy Habit Guard<br/>Coach Nudge says: That's<br/>more villain than habit!]
    Warning --> AddHabit
    Validate -->|Yes ✅| Emoji[🎯 Auto-Assign Emoji<br/>run → 🏃‍♂️]
    
    Emoji --> HabitList[📋 Your Habits List<br/>Habit added with streak: 0]
    
    HabitList --> MarkDone[✓ Mark Habit Done<br/>Click button]
    
    MarkDone --> UpdateStreak[🔥 Update Streak<br/>Consecutive days++]
    
    UpdateStreak --> UpdateRing[⭕ Update Progress Ring<br/>Completion % increases]
    
    UpdateRing --> CheckComplete{100%<br/>complete?}
    
    CheckComplete -->|Yes 🎉| CelebrationModal[🎊 Celebration Modal<br/>Hooray! That was amazing<br/>Did you feel good?]
    CheckComplete -->|No| TinyWins
    
    CelebrationModal --> Response{User<br/>response}
    Response -->|I felt amazing!| Happy[✨ Logged: Positive]
    Response -->|Need nudge| Encourage[💪 Logged: Needs support]
    
    Happy --> TinyWins
    Encourage --> TinyWins
    
    TinyWins[🧩 Tiny Wins Card<br/>You completed 3 habits 🎉<br/>Best streak: 7 days 🔥]
    
    ViewStats --> TinyWins
    Quotes --> TinyWins
    
    TinyWins --> CoachChoice{Want to talk<br/>to Coach Nudge?}
    
    CoachChoice -->|No| Continue
    CoachChoice -->|Yes| CoachMenu{Choose<br/>interaction}
    
    CoachMenu -->|How am I doing?| AIStats[🤖 AI Analysis<br/>Send stats to OpenRouter]
    CoachMenu -->|Give me mini task| LocalTask[🎲 Random Challenge<br/>Local: Take 3 sips water]
    CoachMenu -->|I did it| LocalCelebrate[🎉 Random Celebration<br/>Local: Tiny win, big momentum!]
    CoachMenu -->|Free chat| FreeChat[💭 Ask Anything<br/>Who are you? I feel tired...]
    
    AIStats --> CheckKey{API key<br/>configured?}
    CheckKey -->|No| Settings[⚙️ Settings Modal<br/>Paste OpenRouter key]
    CheckKey -->|Yes| CallAPI[📡 Call OpenRouter<br/>Model: gpt-oss-20b]
    
    Settings --> CallAPI
    
    CallAPI --> BuildPrompt[📝 Build System Prompt<br/>Stats + Personality + Rules]
    BuildPrompt --> GetResponse[💬 Get AI Response<br/>You've done 3/5 — that's<br/>real momentum! 💪]
    
    FreeChat --> CheckKey
    
    GetResponse --> DisplayCoach[🗨️ Display in Chat<br/>Coach Nudge bubble]
    LocalTask --> DisplayCoach
    LocalCelebrate --> DisplayCoach
    
    DisplayCoach --> AnotherAction{Do another<br/>action?}
    
    AnotherAction -->|Yes| CoachMenu
    AnotherAction -->|No| Continue
    
    Continue[🔄 Continue Using NUDGE<br/>Track more habits]
    Continue --> Choice1
    
    %% Styling
    classDef startEnd fill:#ff9f66,stroke:#e97d49,stroke-width:3px,color:#fff
    classDef dashboard fill:#3d3d3d,stroke:#f8c163,stroke-width:2px,color:#fff
    classDef habit fill:#2d4a3e,stroke:#4ade80,stroke-width:2px,color:#fff
    classDef ai fill:#1e3a5f,stroke:#60a5fa,stroke-width:2px,color:#fff
    classDef celebration fill:#5a2d5a,stroke:#e879f9,stroke-width:2px,color:#fff
    classDef warning fill:#5a2d2d,stroke:#f87171,stroke-width:2px,color:#fff
    classDef decision fill:#2d2d2d,stroke:#fbbf24,stroke-width:2px,color:#fff
    
    class Start,Continue startEnd
    class Dashboard,ViewStats,TinyWins dashboard
    class AddHabit,Emoji,HabitList,MarkDone,UpdateStreak,UpdateRing habit
    class AIStats,CallAPI,BuildPrompt,GetResponse,DisplayCoach,FreeChat ai
    class CelebrationModal,Happy,Encourage,LocalCelebrate celebration
    class Warning warning
    class Welcome,Choice1,Validate,CheckComplete,CoachChoice,CoachMenu,Response,CheckKey,AnotherAction decision
```

## Color Legend

| Color | Component | Purpose |
|-------|-----------|---------|
| 🟠 Orange | Start/End | Entry and continuation points |
| 🟡 Yellow | Decisions | User choices and conditionals |
| 🟢 Green | Habits | Habit management flow |
| 🔵 Blue | AI/Coach | Coach Nudge interactions |
| 🟣 Purple | Celebration | Success and motivation |
| 🔴 Red | Warnings | Guard rails and validation |
| ⚫ Dark | Dashboard | Core UI elements |

---

## Simplified Quick Actions Flow

```mermaid
flowchart LR
    User([👤 User]) --> Coach[🧠 Coach Nudge]
    
    Coach --> Q1[How am I<br/>doing?]
    Coach --> Q2[Give me a<br/>mini task]
    Coach --> Q3[I did it]
    Coach --> Q4[Free chat]
    
    Q1 --> AI1[🤖 OpenRouter API<br/>Stats-based analysis]
    Q2 --> Local1[💻 Local Array<br/>Random challenge]
    Q3 --> Local2[💻 Local Array<br/>Random celebration]
    Q4 --> AI2[🤖 OpenRouter API<br/>Conversational]
    
    AI1 --> Response1[💬 You've done 3/5<br/>— real momentum! 💪]
    Local1 --> Response2[💧 Take 3 sips<br/>of water]
    Local2 --> Response3[🎉 Tiny win,<br/>big momentum!]
    AI2 --> Response4[💭 I'm Coach Nudge<br/>— your habit sidekick]
    
    Response1 --> User
    Response2 --> User
    Response3 --> User
    Response4 --> User
    
    %% Styling
    classDef userStyle fill:#ff9f66,stroke:#e97d49,stroke-width:3px,color:#fff
    classDef coachStyle fill:#3d3d3d,stroke:#f8c163,stroke-width:2px,color:#fff
    classDef aiStyle fill:#1e3a5f,stroke:#60a5fa,stroke-width:2px,color:#fff
    classDef localStyle fill:#2d4a3e,stroke:#4ade80,stroke-width:2px,color:#fff
    classDef responseStyle fill:#5a2d5a,stroke:#e879f9,stroke-width:2px,color:#fff
    
    class User userStyle
    class Coach coachStyle
    class Q1,Q4,AI1,AI2 aiStyle
    class Q2,Q3,Local1,Local2 localStyle
    class Response1,Response2,Response3,Response4 responseStyle
```

---

## Habit Lifecycle Flow

```mermaid
stateDiagram-v2
    [*] --> NotCreated: User opens app
    
    NotCreated --> Creating: Click "Add Habit"
    Creating --> Validating: Enter name + frequency
    
    Validating --> Rejected: Unhealthy keyword detected
    Validating --> Created: Valid habit
    
    Rejected --> Creating: Edit habit name
    
    Created --> Active: Emoji assigned<br/>Streak: 0
    
    Active --> Completed: Mark done today
    Active --> Active: View in list
    
    Completed --> Active: Next day arrives
    Completed --> StreakBuilding: Mark done again<br/>(consecutive day)
    
    StreakBuilding --> Completed: Continue streak
    StreakBuilding --> Active: Miss a day<br/>(streak resets to 1)
    
    Active --> Deleted: Click delete button
    Completed --> Deleted: Click delete button
    StreakBuilding --> Deleted: Click delete button
    
    Deleted --> [*]
    
    note right of Validating
        Guard rails check:
        - Not empty
        - Not unhealthy
        (smoking, vaping, etc.)
    end note
    
    note right of StreakBuilding
        Streak logic:
        - Yesterday done: streak++
        - Gap in days: reset to 1
        - Same day: no change
    end note
```

---

**Created**: November 29, 2025  
**Purpose**: Visual reference for NUDGE workflows with color-coded components
