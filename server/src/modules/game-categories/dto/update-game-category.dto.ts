import { PartialType } from '@nestjs/mapped-types';
import { CreateGameCategoryDto } from './create-game-category.dto';

export class UpdateGameCategoryDto extends PartialType(CreateGameCategoryDto) {}
