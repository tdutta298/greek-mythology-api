import 'package:flutter/material.dart';

class CreatureDetailsPage extends StatelessWidget {
  final Map creature;
  const CreatureDetailsPage({super.key, required this.creature});

  Widget _buildDetail(String title, dynamic value) {
    String displayValue = "N/A";
    
    if (value != null) {
      if (value is List) {
        if (value.isNotEmpty) {
          displayValue = value.where((item) => item != null && item.toString().trim().isNotEmpty).join(', ');
          if (displayValue.isEmpty) displayValue = "N/A";
        }
      } else if (value is String) {
        if (value.trim().isNotEmpty) {
          displayValue = value.trim();
        }
      } else {
        String strValue = value.toString().trim();
        if (strValue.isNotEmpty && strValue != 'null') {
          displayValue = strValue;
        }
      }
    }
    
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$title: ",
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
              color: Colors.orange,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            displayValue,
            style: const TextStyle(fontSize: 14),
          ),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Debug: Print creature data to console
    print('Creature details: $creature');
    
    return Scaffold(
      appBar: AppBar(
        title: Text(creature['name'] ?? 'Unknown Creature'),
        backgroundColor: Colors.orange,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Type", creature['type']),
            _buildDetail("Abilities", creature['abilities']),
            _buildDetail("Origin", creature['origin']),
            _buildDetail("Associated Myths", creature['associatedMyths']),
          ],
        ),
      ),
    );
  }
}
