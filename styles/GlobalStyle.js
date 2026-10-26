import { StyleSheet } from 'react-native';

// Farger for hver prioritet (brukes på oppgavekortene)
export const priorityColors = {
    High: { text: '#d64545', background: '#fdecec' },
    Medium: { text: '#e08a1e', background: '#fdf3e6' },
    Low: { text: '#20a464', background: '#e8f7ef' }
};

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        padding: 20
    },

    homeContainer: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        padding: 25,
        justifyContent: 'center'
    },

    smallHeading: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3867d6',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#17233c',
        marginBottom: 8
    },

    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 30,
        lineHeight: 24
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6b7280',
        marginTop: 25,
        marginBottom: 12,
        letterSpacing: 1
    },

    button: {
        backgroundColor: '#3867d6',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center'
    },

    secondaryButton: {
        backgroundColor: '#17233c',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: 'center'
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },

    progressCard: {
        backgroundColor: '#17233c',
        padding: 20,
        borderRadius: 16,
        marginTop: 15
    },

    progressTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },

    progressText: {
        color: '#d5d9e2',
        fontSize: 14,
        marginBottom: 14
    },

    progressBackground: {
        height: 8,
        backgroundColor: '#455066',
        borderRadius: 10,
        overflow: 'hidden'
    },

    progressBar: {
        height: 8,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },

    taskCard: {
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },

    taskTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },

    taskTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#17233c',
        flex: 1,
        marginRight: 10
    },

    dueDate: {
        fontSize: 14,
        color: '#6b7280'
    },

    priorityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: '#eef2ff'
    },

    priorityText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#3867d6'
    },

    doneButton: {
        marginTop: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#3867d6',
        borderRadius: 8,
        alignItems: 'center'
    },

    doneButtonText: {
        color: '#3867d6',
        fontWeight: '600'
    },

    completedText: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#20a464'
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#17233c',
        marginBottom: 7
    },

    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d7dce2',
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
        fontSize: 16
    },

    priorityContainer: {
        flexDirection: 'row',
        marginBottom: 25
    },

    priorityButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#d7dce2',
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    priorityButtonSelected: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#3867d6',
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
        backgroundColor: '#eef2ff'
    },

    priorityButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#17233c'
    },
    statsContainer: {
    flexDirection: 'row',
    marginBottom: 30
},

statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb'
},

statNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3867d6'
},

statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
},

filterContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15
},

filterButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8
},

filterButtonSelected: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#17233c'
},

filterText: {
    color: '#6b7280',
    fontWeight: '600'
},

filterTextSelected: {
    color: '#ffffff',
    fontWeight: '600'
},

deleteButton: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center'
},

deleteButtonText: {
    color: '#9b3b3b',
    fontSize: 13,
    fontWeight: '600'
},

daysLeftText: {
    color: '#3867d6',
    fontWeight: '600'
},

overdueText: {
    color: '#d64545',
    fontWeight: 'bold'
},

calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb'
},

calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
},

calendarArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center'
},

calendarArrowText: {
    fontSize: 22,
    color: '#3867d6',
    fontWeight: 'bold'
},

calendarMonth: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17233c'
},

calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
},

calendarWeekDay: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#8a94a6',
    marginBottom: 6
},

calendarCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 4
},

calendarDay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center'
},

calendarToday: {
    borderWidth: 1,
    borderColor: '#3867d6'
},

calendarSelected: {
    backgroundColor: '#3867d6'
},

calendarDayText: {
    color: '#17233c',
    fontSize: 14
},

calendarDayTextSelected: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
},

calendarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 3
},

todayButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center'
},

todayButtonText: {
    color: '#3867d6',
    fontWeight: '600'
},

planCard: {
    backgroundColor: '#17233c',
    padding: 20,
    borderRadius: 16,
    marginTop: 15
},

planText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 24
},

hintText: {
    color: '#8a94a6',
    fontSize: 13,
    textAlign: 'center'
},

errorText: {
    color: '#d64545',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center'
},

emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 30,
    fontSize: 15
}

});