"use client";

import { TodoBoard } from "@/components/todo-board";
import { FullSendCard } from "@/components/full-send";
import { AgentState } from "@/lib/types";
import { CatchAllActionRenderProps, useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { BackendToolsCard } from "@/components/backend-tools";
import { initialState } from "@/lib/defaults";
import { StatsVisualizer } from "@/components/stats-visualizer";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { ColorPicker } from "@/components/color-picker";
import { NotificationCenter } from "@/components/notification-center";
import { Calculator } from "@/components/calculator";
import { CodeFormatter } from "@/components/code-formatter";

export default function Home() {
  const [themeColor, setThemeColor] = useState("#6366f1");
  //const [state, setState] = useState<AgentState>(initialState);

  /*
    🪁 Shared State with Agent
  */

  const { state, setState } = useCoAgent<AgentState>({
    name: "my_agent", // Must match the agent name in route.ts
    initialState
  });

  /*
    🪁 Frontend Action
  */

  useCopilotAction({
    name: "setThemeColor",
    parameters: [{ name: "themeColor", description: "The theme color to set.", required: true }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  /*
    🪁 Human in the Loop
  */

  useCopilotAction({
    name: "full_send",
    description: "Mark all todos as complete. Requires user confirmation.",
    renderAndWaitForResponse: (props) => (
      <FullSendCard themeColor={themeColor} {...props} state={state} setState={setState} />
    ),
  }, [themeColor, state, setState]);

  /*
    🪁 Frontend Tools - Stats Visualizer
  */

  useCopilotAction({
    name: "showTaskStatistics",
    description: "Display visual statistics and analytics about the current tasks",
    render: () => (
      <StatsVisualizer themeColor={themeColor} todos={state.todos} />
    ),
  }, [themeColor, state.todos]);

  /*
    🪁 Frontend Tools - Pomodoro Timer
  */

  useCopilotAction({
    name: "startPomodoroTimer",
    description: "Start a pomodoro timer to help focus on tasks",
    parameters: [
      { name: "duration", description: "Duration in minutes (default: 25)", type: "number", required: false }
    ],
    render: (props) => (
      <PomodoroTimer themeColor={themeColor} duration={(props as any).duration || 25} />
    ),
  }, [themeColor]);

  /*
    🪁 Frontend Tools - Color Picker
  */

  useCopilotAction({
    name: "openColorPicker",
    description: "Open a color picker to change the theme color",
    render: () => (
      <ColorPicker themeColor={themeColor} onColorChange={setThemeColor} />
    ),
  }, [themeColor]);

  /*
    🪁 Frontend Tools - Notification Center
  */

  useCopilotAction({
    name: "showNotifications",
    description: "Display the notification center with recent activity",
    render: () => (
      <NotificationCenter themeColor={themeColor} />
    ),
  }, [themeColor]);

  /*
    🪁 Frontend Tools - Calculator
  */

  useCopilotAction({
    name: "openCalculator",
    description: "Open a calculator for quick calculations",
    render: () => (
      <Calculator themeColor={themeColor} />
    ),
  }, [themeColor]);

  /*
    🪁 Frontend Tools - Code Formatter
  */

  useCopilotAction({
    name: "formatCode",
    description: "Format and display code snippets with syntax highlighting",
    parameters: [
      { name: "code", description: "The code to format", type: "string", required: false },
      { name: "language", description: "Programming language (javascript, python, etc.)", type: "string", required: false }
    ],
    render: (props) => (
      <CodeFormatter themeColor={themeColor} code={(props as any).code} language={(props as any).language} />
    ),
  }, [themeColor]);

  /*
    🪁 Backend Tools
  */

  useCopilotAction({
    name: "*",
    render: (props: CatchAllActionRenderProps) => (
      <BackendToolsCard themeColor={themeColor} {...props} />
    ),
  }, [themeColor]);

  return (
    <main style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
      {/* 
        🪁 Agent Chat UI
      */}
      <CopilotSidebar
        clickOutsideToClose={false}
        disableSystemMessage={true}
        labels={{
          title: "Todo Assistant",
          initial: "👋 Hi! I can help you manage your todos.",
        }}
        suggestions={[
          { title: "📊 View Stats", message: "Show me task statistics" },
          { title: "⏱️ Start Timer", message: "Start a 25 minute pomodoro timer" },
          { title: "🎨 Pick Color", message: "Open the color picker" },
          { title: "🔔 Notifications", message: "Show notifications" },
          { title: "🔢 Calculator", message: "Open the calculator" },
          { title: "💻 Format Code", message: "Show me a code formatter" },
          { title: "Add Todos", message: "Add a todo to build a website." },
          { title: "Change Theme", message: "Set the theme to a nice purple." },
        ]}
      >
        <div
          style={{ backgroundColor: themeColor }}
          className="h-screen w-full transition-colors duration-300"
        >
          <TodoBoard state={state} setState={setState} />
        </div>
      </CopilotSidebar>
    </main>
  );
}