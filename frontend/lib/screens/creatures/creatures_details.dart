import 'package:flutter/material.dart';

class CreatureDetailsPage extends StatelessWidget {
  final Map creature;
  const CreatureDetailsPage({super.key, required this.creature});

  Widget _buildDetail(String title, dynamic value) {
    if (value is List) value = value.join(', ');
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("$title: ", style: const TextStyle(fontWeight: FontWeight.bold)),
          Expanded(child: Text(value ?? "N/A")),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(creature['name']), backgroundColor: Colors.orange),
      body: Padding(
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
