export type AutomationHistoryItem = {
  action: string;
  success: boolean;
  timestamp: string;
  result?: unknown;
};


const history: AutomationHistoryItem[] = [];


export function saveAutomationHistory(
  item: AutomationHistoryItem
) {

  history.push(item);

}


export function getAutomationHistory() {

  return history;

}