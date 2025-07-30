/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StickyNote, ApiResponse } from '@/types';

const API_DELAY = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockStickyNotesAPI {
  private static instance: MockStickyNotesAPI;
  private notes: StickyNote[] = [];

  static getInstance(): MockStickyNotesAPI {
    if (!MockStickyNotesAPI.instance) {
      MockStickyNotesAPI.instance = new MockStickyNotesAPI();
    }
    return MockStickyNotesAPI.instance;
  }

  async loadNotes(): Promise<ApiResponse<StickyNote[]>> {
    await delay(API_DELAY);

    try {
      if (Math.random() < 0.9) {
        return {
          success: true,
          data: [...this.notes],
        };
      } else {
        return {
          success: false,
          error: 'Failed to load notes from server',
        };
      }
    } catch (_) {
      return {
        success: false,
        error: 'Network error while loading notes',
      };
    }
  }

  async saveNotes(notes: StickyNote[]): Promise<ApiResponse<void>> {
    await delay(API_DELAY);

    try {
      // Simulate API call success/failure (90% success rate)
      if (Math.random() < 0.9) {
        this.notes = [...notes];
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: 'Failed to save notes to server',
        };
      }
    } catch (_) {
      return {
        success: false,
        error: 'Network error while saving notes',
      };
    }
  }

  async createNote(note: StickyNote): Promise<ApiResponse<StickyNote>> {
    await delay(API_DELAY / 2);

    try {
      if (Math.random() < 0.95) {
        this.notes.push(note);
        return {
          success: true,
          data: note,
        };
      } else {
        return {
          success: false,
          error: 'Failed to create note on server',
        };
      }
    } catch (_) {
      return {
        success: false,
        error: 'Network error while creating note',
      };
    }
  }

  async updateNote(
    id: string,
    updates: Partial<StickyNote>
  ): Promise<ApiResponse<StickyNote>> {
    await delay(API_DELAY / 2);

    try {
      if (Math.random() < 0.95) {
        const noteIndex = this.notes.findIndex((note) => note.id === id);
        if (noteIndex !== -1) {
          this.notes[noteIndex] = { ...this.notes[noteIndex], ...updates };
          return {
            success: true,
            data: this.notes[noteIndex],
          };
        } else {
          return {
            success: false,
            error: 'Note not found on server',
          };
        }
      } else {
        return {
          success: false,
          error: 'Failed to update note on server',
        };
      }
    } catch (_) {
      return {
        success: false,
        error: 'Network error while updating note',
      };
    }
  }

  async deleteNote(id: string): Promise<ApiResponse<void>> {
    await delay(API_DELAY / 2);

    try {
      if (Math.random() < 0.95) {
        this.notes = this.notes.filter((note) => note.id !== id);
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: 'Failed to delete note on server',
        };
      }
    } catch (_) {
      return {
        success: false,
        error: 'Network error while deleting note',
      };
    }
  }
}

export const mockAPI = MockStickyNotesAPI.getInstance();
