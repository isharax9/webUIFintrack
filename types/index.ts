export type TransactionType = "INCOME" | "EXPENSE";

export interface User {
  id: string;
  name: string;
  email: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: string;
  type: TransactionType;
  categoryId: string;
  category: Category;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetGoal {
  id: string;
  userId: string;
  categoryId: string;
  category: Category;
  limitAmount: string;
  month: number;
  year: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ReportSummary {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  savingsRate: number;
}

export interface CategoryReport {
  categoryId: string;
  categoryName: string;
  color: string;
  icon: string;
  amount: number;
}

export interface TrendData {
  month: string;
  income: number;
  expense: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
