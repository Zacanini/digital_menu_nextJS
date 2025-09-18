/**
 * Domain Entity: Pizza
 * 
 * Representa uma pizza no menu digital da Sapore Digitale.
 * Esta entidade é parte da camada de domínio e não possui dependências externas.
 */

export interface Pizza {
  /** Identificador único da pizza */
  id: string;
  
  /** Nome da pizza */
  name: string;
  
  /** Descrição detalhada da pizza */
  description: string;
  
  /** Lista de ingredientes principais */
  ingredients: string[];
  
  /** Preço da pizza em reais (formato numérico para cálculos) */
  price: number;
  
  /** URL da imagem da pizza */
  imageUrl: string;
  
  /** ID da categoria à qual a pizza pertence */
  categoryId: string;
  
  /** Indica se a pizza está disponível */
  isAvailable: boolean;
  
  /** Indica se é uma pizza em destaque */
  isFeatured: boolean;
  
  /** Tempo estimado de preparo em minutos */
  preparationTime: number;
  
  /** Informações nutricionais opcionais */
  nutritionalInfo?: NutritionalInfo;
  
  /** Tags para filtros (ex: 'vegetariana', 'sem-gluten', 'picante') */
  tags: string[];
  
  /** Slug para URLs amigáveis */
  slug: string;
}

/**
 * Interface para informações nutricionais da pizza
 */
export interface NutritionalInfo {
  /** Calorias por fatia */
  caloriesPerSlice: number;
  
  /** Proteínas em gramas */
  protein: number;
  
  /** Carboidratos em gramas */
  carbohydrates: number;
  
  /** Gorduras em gramas */
  fat: number;
  
  /** Fibras em gramas */
  fiber: number;
}

/**
 * Enum para tamanhos de pizza
 */
export enum PizzaSize {
  PEQUENA = 'pequena',
  MEDIA = 'media',
  GRANDE = 'grande',
  FAMILIA = 'familia'
}

/**
 * Enum para tipos de massa
 */
export enum PizzaDough {
  TRADICIONAL = 'tradicional',
  FINA = 'fina',
  INTEGRAL = 'integral',
  SEM_GLUTEN = 'sem-gluten'
}