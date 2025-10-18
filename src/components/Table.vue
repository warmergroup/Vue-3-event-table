<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { events, type Event } from '../data/EventData';
import EditModal from './EditModal.vue';
import DeleteModal from './DeleteModal.vue';


const expandedGroups = ref<Set<string>>(new Set());
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedEvent = ref<Event | null>(null);
const eventsData = reactive([...events]);

const groupedEvents = computed(() => {
    const groups: { [date: string]: Event[] } = {};

    eventsData.forEach(event => {
        if (!groups[event.date]) {
            groups[event.date] = [];
        }
        groups[event.date]!.push(event);
    });

    return Object.keys(groups).map(date => ({
        date,
        items: groups[date]!
    }));
});

const initializeExpandedGroups = () => {
    groupedEvents.value.forEach(group => {
        expandedGroups.value.add(group.date);
    });
};

initializeExpandedGroups();

const getEventClass = (eventType: string): string => {
    if (eventType.includes('Off duty')) return 'off-duty';
    if (eventType.includes('Driving')) return 'driving';
    if (eventType.includes('Sleeper')) return 'sleeper';
    if (eventType.includes('Intermediate')) return 'intermediate';
    return '';
};

const toggleGroup = (date: string) => {
    if (expandedGroups.value.has(date)) {
        expandedGroups.value.delete(date);
    } else {
        expandedGroups.value.add(date);
    }
};

const isGroupExpanded = (date: string): boolean => {
    return expandedGroups.value.has(date);
};

const handleEdit = (event: Event) => {
    selectedEvent.value = event;
    isEditModalOpen.value = true;
};

const handleCopy = (event: Event) => {
    alert(`Event ${event.id} copied successfully!`);
};

const handleDelete = (event: Event) => {
    selectedEvent.value = event;
    isDeleteModalOpen.value = true;
};

const handleSaveEvent = (updatedData: Partial<Event>) => {
    if (!selectedEvent.value) return;

    const eventIndex = eventsData.findIndex(e => e.id === selectedEvent.value!.id);
    if (eventIndex !== -1 && eventsData[eventIndex]) {
        Object.assign(eventsData[eventIndex], updatedData);
    }
    handleCloseEditModal();
};

const handleConfirmDelete = () => {
    if (!selectedEvent.value) return;

    const eventIndex = eventsData.findIndex(e => e.id === selectedEvent.value!.id);
    if (eventIndex !== -1) {
        eventsData.splice(eventIndex, 1);
    }
    handleCloseDeleteModal();
};

const handleCloseEditModal = () => {
    isEditModalOpen.value = false;
    selectedEvent.value = null;
};

const handleCloseDeleteModal = () => {
    isDeleteModalOpen.value = false;
    selectedEvent.value = null;
};

</script>

<template>
    <div class="events-container">
        <h2 class="events-title">EVENTS</h2>

        <table class="events-table">
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Time (CDT)</th>
                    <th>Duration</th>
                    <th>Event</th>
                    <th>Location</th>
                    <th>System</th>
                    <th>Odometer</th>
                    <th>Eng Hours</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(event, index) in groupedEvents" :key="`group-${index}`">
                    <tr class="date-row" @click="toggleGroup(event.date)">
                        <td colspan="12">
                            <span class="expand-icon" :class="{ 'collapsed': !isGroupExpanded(event.date) }">
                                <i class="fa-solid fa-chevron-down"></i>
                            </span>
                            <strong>{{ event.date }}</strong>
                        </td>
                    </tr>

                    <template v-if="isGroupExpanded(event.date)">
                        <tr v-for="item in event.items" :key="item.id" class="data-row">
                            <td><input type="checkbox" /></td>
                            <td>{{ item.id }}</td>
                            <td>{{ item.time }}</td>
                            <td>{{ item.duration }}</td>
                            <td>
                                <span class="event-badge" :class="getEventClass(item.event)">
                                    <span class="event-icon" :class="getEventClass(item.event)"></span>
                                    {{ item.event }}
                                </span>
                            </td>
                            <td>{{ item.location }}</td>
                            <td>{{ item.system }}</td>
                            <td>{{ item.odometer }}</td>
                            <td>{{ item.engHours }}</td>
                            <td>{{ item.notes }}</td>
                            <td>
                                <span class="status-badge" :class="item.status.toLowerCase()">
                                    {{ item.status }}
                                </span>
                            </td>
                            <td>
                                <div class="actions">
                                    <button class="action-btn" title="Edit" @click="handleEdit(item)"><i
                                            class="fas fa-pencil-alt"></i></button>
                                    <button class="action-btn" title="Copy" @click="handleCopy(item)"><i
                                            class="fas fa-copy"></i></button>
                                    <button class="action-btn" title="Delete" @click="handleDelete(item)"><i
                                            class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>

    <EditModal :is-open="isEditModalOpen" :event-data="selectedEvent" @close="handleCloseEditModal"
        @save="handleSaveEvent" />

    <DeleteModal :is-open="isDeleteModalOpen" :event-data="selectedEvent" @close="handleCloseDeleteModal"
        @confirm="handleConfirmDelete" />
</template>

<style scoped>
.events-container {
    padding: 20px;
    background-color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.events-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1a1a1a;
}

.events-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.events-table th {
    background: #f8f9fa;
    padding: 12px 8px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6c757d;
    border: 1px solid #e9ecef;
}

.events-table td {
    padding: 12px 8px;
    font-size: 13px;
    color: #495057;
    border: 1px solid #e9ecef;
}

.date-row {
    background: #f1f3f5;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.date-row:hover {
    background: #e9ecef;
}

.date-row td {
    padding: 10px 12px;
    font-weight: 500;
}

.expand-icon {
    margin-right: 8px;
    font-size: 10px;
    color: #6c757d;
    transition: transform 0.3s ease;
    display: inline-block;
}

.expand-icon.collapsed {
    transform: rotate(-90deg);
}


.data-row {
    background: white;
}

.data-row:hover {
    background: #f8f9fa;
}

.event-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
}

.event-icon {
    width: 10px;
    height: 20px;
    border-radius: 50px;
    display: inline-block;
}

.event-icon.off-duty {
    background: #8b7355;
}

.event-icon.driving {
    background: #51cf66;
}

.event-icon.sleeper {
    background: #5b8def;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.pending {
    background: #e3f2fd;
    color: #1976d2;
}

.status-badge.unassigned {
    background: #ffebee;
    color: #c62828;
}

.actions {
    display: flex;
    gap: 4px;
}

.action-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    font-size: 14px;
    opacity: 0.7;
    transition: all 0.2s;
    border-radius: 4px;
    color: #6c757d;
}

.action-btn:hover {
    opacity: 1;
    background-color: #f8f9fa;
    color: #495057;
}

input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border: 2px solid #d1d5db;
    border-radius: 3px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
}

input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}

input[type="checkbox"]:checked::after {
    content: 'X';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}
</style>
