/**
 * Home Page - Sapore
 * 
 * Página principal do menu digital da pizzaria.
 * Server Component que busca dados usando Clean Architecture.
 */

import { menuAPIService } from '../infrastructure/services/menu-api-service';
import { getMenuItemsUseCase } from '../application/use-cases/get-menu-items';
import { MenuDisplay } from '../components/shared/MenuDisplay';

export default async function Home() {
  // Busca dados usando Clean Architecture - injeção de dependência
  const menuData = await getMenuItemsUseCase(menuAPIService);

  return <MenuDisplay menuData={menuData} />;
}