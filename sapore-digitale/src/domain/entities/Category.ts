/**
 * Domain Entity: Category
 * 
 * Representa uma categoria de pizzas no menu digital da Sapore.
 * Esta entidade é parte da camada de domínio e não possui dependências externas.
 */

export interface Category {
  /** Identificador único da categoria */
  id: string;
  
  /** Nome da categoria exibido no menu */
  name: string;
  
  /** Descrição opcional da categoria */
  description?: string;
  
  /** Slug para URLs amigáveis */
  slug: string;
  
  /** Ordem de exibição no menu */
  order: number;
  
  /** Indica se a categoria está ativa/visível */
  isActive: boolean;
}

/**
 * Enum para tipos de categorias pré-definidos
 */
export enum CategoryType {
  SALGADAS = 'salgadas',
  DOCES = 'doces',
  VEGANAS = 'veganas',
  ESPECIAIS = 'especiais'
}